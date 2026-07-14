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
exports.BusinessProfileService = void 0;
const common_1 = require("@nestjs/common");
const business_profile_repository_1 = require("./repositories/business-profile.repository");
let BusinessProfileService = class BusinessProfileService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
    }
    async getProfileBySlug(slug) {
        const profile = await this.profileRepo.findById({ slug });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        return profile;
    }
    async getProfileByUserId(userId) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado para este usuario');
        }
        return profile;
    }
    async updateProfile(userId, updateData) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        const allowedFields = [
            'name', 'tagline', 'description', 'phone', 'email', 'address',
            'banner', 'logo', 'slug', 'products', 'testimonials', 'faqs', 'gallery', 'sections'
        ];
        const cleanUpdateData = {};
        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                cleanUpdateData[key] = updateData[key];
            }
        }
        await this.profileRepo.update({ id: profile.id }, cleanUpdateData);
        const updated = await this.profileRepo.findById({ id: profile.id });
        if (!updated) {
            throw new common_1.NotFoundException('Error al recuperar perfil actualizado');
        }
        return updated;
    }
    async updateSections(userId, sections) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado');
        }
        await this.profileRepo.update({ id: profile.id }, { sections });
        const updated = await this.profileRepo.findById({ id: profile.id });
        if (!updated) {
            throw new common_1.NotFoundException('Error al recuperar perfil actualizado');
        }
        return updated;
    }
};
exports.BusinessProfileService = BusinessProfileService;
exports.BusinessProfileService = BusinessProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [business_profile_repository_1.BusinessProfileRepository])
], BusinessProfileService);
//# sourceMappingURL=business-profile.service.js.map