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
exports.LandingService = void 0;
const common_1 = require("@nestjs/common");
const landing_lead_repository_1 = require("./repositories/landing-lead.repository");
const landing_faq_repository_1 = require("./repositories/landing-faq.repository");
const landing_testimonial_repository_1 = require("./repositories/landing-testimonial.repository");
const business_profile_repository_1 = require("../business-profile/repositories/business-profile.repository");
let LandingService = class LandingService {
    leadRepo;
    faqRepo;
    testimonialRepo;
    profileRepo;
    constructor(leadRepo, faqRepo, testimonialRepo, profileRepo) {
        this.leadRepo = leadRepo;
        this.faqRepo = faqRepo;
        this.testimonialRepo = testimonialRepo;
        this.profileRepo = profileRepo;
    }
    async createLead(slug, dto) {
        const profile = await this.profileRepo.findById({ slug });
        if (!profile) {
            throw new common_1.NotFoundException('El negocio solicitado no existe.');
        }
        if (!dto.email.includes('@')) {
            throw new common_1.BadRequestException('El formato de correo no es válido.');
        }
        const lead = await this.leadRepo.create({
            userId: profile.userId,
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            metadata: dto.metadata || {},
        });
        return {
            success: true,
            message: 'Prospecto registrado exitosamente.',
            leadId: lead.id,
        };
    }
    async getLeadsByUser(userId) {
        return this.leadRepo.findAll({ userId });
    }
    async getPublicLandingData(slug) {
        const profile = await this.profileRepo.findById({ slug });
        if (!profile) {
            throw new common_1.NotFoundException('El negocio solicitado no existe.');
        }
        const faqs = await this.faqRepo.findAll({ userId: profile.userId });
        const testimonials = await this.testimonialRepo.findAll({ userId: profile.userId });
        const sortedFaqs = faqs.sort((a, b) => a.order - b.order);
        const sortedTestimonies = testimonials.sort((a, b) => a.order - b.order);
        return {
            profile: {
                name: profile.name,
                tagline: profile.tagline,
                description: profile.description,
                phone: profile.phone,
                email: profile.email,
                address: profile.address,
                banner: profile.banner,
                logo: profile.logo,
                slug: profile.slug,
                products: profile.products || [],
                gallery: profile.gallery || [],
            },
            templateId: profile.templateId || 'minimalist_dark',
            globalStyles: profile.globalStyles || {
                paletteId: 'pizarra',
                fontPairId: 'modern_serif',
                buttonStyle: 'rounded',
            },
            landingConfig: profile.landingConfig || [],
            faqs: sortedFaqs,
            testimonials: sortedTestimonies,
        };
    }
    async saveLandingConfig(userId, data) {
        const profile = await this.profileRepo.findById({ userId });
        if (!profile) {
            throw new common_1.NotFoundException('Perfil de negocio no encontrado.');
        }
        const sortedConfig = (data.landingConfig || []).sort((a, b) => a.order - b.order);
        await this.profileRepo.update({ id: profile.id }, {
            templateId: data.templateId || profile.templateId || 'minimalist_dark',
            landingConfig: sortedConfig,
            globalStyles: data.globalStyles,
        });
        return {
            templateId: data.templateId || profile.templateId || 'minimalist_dark',
            landingConfig: sortedConfig,
            globalStyles: data.globalStyles,
        };
    }
};
exports.LandingService = LandingService;
exports.LandingService = LandingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [landing_lead_repository_1.LandingLeadRepository,
        landing_faq_repository_1.LandingFaqRepository,
        landing_testimonial_repository_1.LandingTestimonialRepository,
        business_profile_repository_1.BusinessProfileRepository])
], LandingService);
//# sourceMappingURL=landing.service.js.map