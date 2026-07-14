"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfileBySlug(slug) {
        const profile = await this.prisma.businessProfile.findUnique({
            where: { slug },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil comercial no encontrado');
        }
        return profile;
    }
    async getProfileByUserId(userId) {
        const profile = await this.prisma.businessProfile.findUnique({
            where: { userId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil comercial no encontrado');
        }
        return profile;
    }
    async updateProfile(userId, data) {
        const profile = await this.prisma.businessProfile.findUnique({
            where: { userId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil comercial no encontrado');
        }
        const { id, userId: _, createdAt, updatedAt, ...updateData } = data;
        return this.prisma.businessProfile.update({
            where: { userId },
            data: {
                ...updateData,
                products: updateData.products !== undefined ? updateData.products : undefined,
                testimonials: updateData.testimonials !== undefined ? updateData.testimonials : undefined,
                faqs: updateData.faqs !== undefined ? updateData.faqs : undefined,
                gallery: updateData.gallery !== undefined ? updateData.gallery : undefined,
                sections: updateData.sections !== undefined ? updateData.sections : undefined,
            },
        });
    }
    async updateSections(userId, sections) {
        const profile = await this.prisma.businessProfile.findUnique({
            where: { userId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil comercial no encontrado');
        }
        return this.prisma.businessProfile.update({
            where: { userId },
            data: {
                sections: sections,
            },
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map