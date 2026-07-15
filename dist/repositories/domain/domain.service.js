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
exports.DomainService = void 0;
const common_1 = require("@nestjs/common");
const business_profile_repository_1 = require("../business-profile/repositories/business-profile.repository");
const landing_service_1 = require("../landing/landing.service");
const dns = __importStar(require("dns"));
const util_1 = require("util");
const resolveCname = (0, util_1.promisify)(dns.resolveCname);
const resolveA = (0, util_1.promisify)(dns.resolve4);
let DomainService = class DomainService {
    profileRepo;
    landingService;
    constructor(profileRepo, landingService) {
        this.profileRepo = profileRepo;
        this.landingService = landingService;
    }
    async validateDomainForCaddy(domain) {
        const cleanDomain = domain.toLowerCase().trim();
        const profile = await this.profileRepo.findById([
            { customDomain: cleanDomain, domainVerified: true },
            { subdomain: cleanDomain, domainVerified: true }
        ]);
        return !!profile;
    }
    async getLandingDataByHost(host) {
        const cleanHost = host.split(':')[0].toLowerCase().trim();
        const profile = await this.profileRepo.findById([
            { customDomain: cleanHost },
            { subdomain: cleanHost }
        ]);
        if (!profile) {
            throw new common_1.NotFoundException(`Ninguna landing está vinculada al host: ${cleanHost}`);
        }
        return this.landingService.getPublicLandingData(profile.slug);
    }
    async linkDomain(userId, dto) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        const updates = {};
        if (dto.customDomain !== undefined) {
            updates.customDomain = dto.customDomain ? dto.customDomain.toLowerCase().trim() : null;
            updates.domainVerified = false;
        }
        if (dto.subdomain !== undefined) {
            if (dto.subdomain && !/^[a-z0-9-]+$/.test(dto.subdomain)) {
                throw new common_1.BadRequestException('Formato de subdominio inválido');
            }
            updates.subdomain = dto.subdomain ? `${dto.subdomain.toLowerCase().trim()}.bercario.co` : null;
            if (dto.subdomain) {
                updates.domainVerified = true;
            }
        }
        await this.profileRepo.update({ id: profile.id }, updates);
        return this.profileRepo.findById({ id: profile.id });
    }
    async verifyDomainDns(userId) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile || !profile.customDomain) {
            throw new common_1.BadRequestException('No hay un dominio personalizado configurado para verificar.');
        }
        const targetDomain = profile.customDomain;
        let isConfiguredCorrectly = false;
        try {
            if (targetDomain.startsWith('www.')) {
                const cnames = await resolveCname(targetDomain);
                isConfiguredCorrectly = cnames.some(cname => cname.includes('domains.bercario.co'));
            }
            else {
                const ips = await resolveA(targetDomain);
                isConfiguredCorrectly = ips.includes('76.76.21.21');
            }
        }
        catch (err) {
            console.warn(`Error resolviendo DNS para ${targetDomain}:`, err);
            isConfiguredCorrectly = true;
        }
        if (isConfiguredCorrectly) {
            await this.profileRepo.update({ id: profile.id }, { domainVerified: true });
            return { success: true, domainVerified: true };
        }
        else {
            return { success: false, domainVerified: false, message: 'Los registros DNS aún no apuntan a Berçário.' };
        }
    }
};
exports.DomainService = DomainService;
exports.DomainService = DomainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [business_profile_repository_1.BusinessProfileRepository,
        landing_service_1.LandingService])
], DomainService);
//# sourceMappingURL=domain.service.js.map