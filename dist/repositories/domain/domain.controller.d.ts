import { DomainService } from './domain.service';
import { LinkDomainDto } from '../business-profile/dto/domain-config.dto';
export declare class DomainController {
    private readonly domainService;
    constructor(domainService: DomainService);
    checkDomain(domain: string): Promise<{
        status: string;
    }>;
    getLandingByHost(host: string): Promise<{
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
        faqs: import("../landing/entities/landing-faq.entity").LandingFaqEntity[];
        testimonials: import("../landing/entities/landing-testimonial.entity").LandingTestimonialEntity[];
    }>;
    linkDomain(req: any, dto: LinkDomainDto): Promise<import("../business-profile/entities/business-profile.entity").BusinessProfileEntity | null>;
    verifyDomain(req: any): Promise<{
        success: boolean;
        domainVerified: boolean;
        message?: undefined;
    } | {
        success: boolean;
        domainVerified: boolean;
        message: string;
    }>;
}
