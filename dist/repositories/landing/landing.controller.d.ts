import { LandingService } from './landing.service';
import { CreateLeadDto } from './dto/landing.dto';
import { UpdateLandingConfigDto } from '../business-profile/dto/landing-config.dto';
export declare class LandingController {
    private readonly landingService;
    constructor(landingService: LandingService);
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
    createLead(slug: string, body: CreateLeadDto): Promise<{
        success: boolean;
        message: string;
        leadId: string;
    }>;
    saveLandingConfig(req: any, body: UpdateLandingConfigDto): Promise<{
        templateId: string;
        landingConfig: import("../business-profile/dto/landing-config.dto").LandingConfigItemDto[];
        globalStyles: import("../business-profile/dto/landing-config.dto").GlobalStylesDto;
    }>;
    getLeads(req: any): Promise<import("./entities/landing-lead.entity").LandingLeadEntity[]>;
}
