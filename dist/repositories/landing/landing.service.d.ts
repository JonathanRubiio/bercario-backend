import { LandingLeadRepository } from './repositories/landing-lead.repository';
import { LandingFaqRepository } from './repositories/landing-faq.repository';
import { LandingTestimonialRepository } from './repositories/landing-testimonial.repository';
import { BusinessProfileRepository } from '../business-profile/repositories/business-profile.repository';
import { CreateLeadDto } from './dto/landing.dto';
import { UpdateLandingConfigDto } from '../business-profile/dto/landing-config.dto';
export declare class LandingService {
    private readonly leadRepo;
    private readonly faqRepo;
    private readonly testimonialRepo;
    private readonly profileRepo;
    constructor(leadRepo: LandingLeadRepository, faqRepo: LandingFaqRepository, testimonialRepo: LandingTestimonialRepository, profileRepo: BusinessProfileRepository);
    createLead(slug: string, dto: CreateLeadDto): Promise<{
        success: boolean;
        message: string;
        leadId: string;
    }>;
    getLeadsByUser(userId: string): Promise<import("./entities/landing-lead.entity").LandingLeadEntity[]>;
    getPublicLandingData(slug: string): Promise<{
        profile: {
            name: string;
            tagline: string;
            description: string;
            phone: string;
            email: string;
            address: string;
            banner: string;
            logo: string;
            slug: string;
            products: any[];
            gallery: string[];
        };
        templateId: string;
        globalStyles: any;
        landingConfig: any[];
        faqs: import("./entities/landing-faq.entity").LandingFaqEntity[];
        testimonials: import("./entities/landing-testimonial.entity").LandingTestimonialEntity[];
    }>;
    saveLandingConfig(userId: string, data: UpdateLandingConfigDto): Promise<{
        templateId: string;
        landingConfig: import("../business-profile/dto/landing-config.dto").LandingConfigItemDto[];
        globalStyles: import("../business-profile/dto/landing-config.dto").GlobalStylesDto;
    }>;
}
