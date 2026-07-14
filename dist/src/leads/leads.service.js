"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
let LeadsService = class LeadsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLead(data) {
        if (data.website && data.website.trim() !== '') {
            console.warn('Bot detectado mediante Honeypot. Ignorando petición silenciosamente.');
            return { success: true, message: 'Solicitud enviada exitosamente.' };
        }
        if (!data.businessName || !data.email || !data.city) {
            throw new common_1.BadRequestException('Faltan campos obligatorios');
        }
        if (!data.email.includes('@')) {
            throw new common_1.BadRequestException('El formato de correo no es válido');
        }
        if (data.businessName.length > 100 || data.city.length > 100 || (data.message && data.message.length > 1000)) {
            throw new common_1.BadRequestException('Los datos exceden el límite de longitud permitido');
        }
        const existingLead = await this.prisma.lead.findFirst({
            where: {
                email: data.email,
                status: 'PENDING',
            },
        });
        if (existingLead) {
            console.warn(`Lead duplicado detectado para el correo: ${data.email}. Ignorando duplicado silenciosamente.`);
            return { success: true, message: 'Solicitud enviada exitosamente.' };
        }
        const lead = await this.prisma.lead.create({
            data: {
                businessName: data.businessName,
                email: data.email,
                city: data.city,
                message: data.message || '',
                status: 'PENDING',
            },
        });
        return { success: true, leadId: lead.id };
    }
    async getAllLeads() {
        return this.prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateLeadStatus(id, status) {
        const lead = await this.prisma.lead.findUnique({
            where: { id },
        });
        if (!lead) {
            throw new common_1.NotFoundException('Solicitud no encontrada');
        }
        if (lead.status !== 'PENDING') {
            throw new common_1.BadRequestException('Esta solicitud ya fue procesada');
        }
        if (status === 'ACCEPTED') {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: lead.email },
            });
            if (!existingUser) {
                const defaultPassword = 'password1234';
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);
                const slug = lead.businessName
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
                let uniqueSlug = slug;
                let counter = 1;
                while (await this.prisma.businessProfile.findUnique({ where: { slug: uniqueSlug } })) {
                    uniqueSlug = `${slug}-${counter}`;
                    counter++;
                }
                const newUser = await this.prisma.user.create({
                    data: {
                        email: lead.email,
                        password: hashedPassword,
                        name: lead.businessName,
                        role: 'mayorista',
                    },
                });
                await this.prisma.businessProfile.create({
                    data: {
                        userId: newUser.id,
                        name: lead.businessName,
                        tagline: 'Nuevo negocio en Berçário',
                        description: lead.message || 'Descripción del negocio...',
                        phone: '',
                        email: lead.email,
                        address: lead.city,
                        banner: '/images/company-banner.png',
                        logo: '/images/company-logo.png',
                        slug: uniqueSlug,
                        products: [],
                        testimonials: [],
                        faqs: [],
                        gallery: [],
                        sections: [
                            {
                                id: 'banner',
                                type: 'banner',
                                label: 'Banner principal',
                                description: 'Imagen destacada, logo y nombre del negocio.',
                            },
                            {
                                id: 'about',
                                type: 'about',
                                label: 'Quiénes somos',
                                description: 'Descripción y propuesta de valor del negocio.',
                            },
                        ],
                    },
                });
            }
        }
        return this.prisma.lead.update({
            where: { id },
            data: { status },
        });
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map