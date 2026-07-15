import { BusinessProfileRepository } from '../business-profile/repositories/business-profile.repository';
import { LandingService } from '../landing/landing.service';
import { LinkDomainDto } from '../business-profile/dto/domain-config.dto';
export declare class DomainService {
    private readonly profileRepo;
    private readonly landingService;
    constructor(profileRepo: BusinessProfileRepository, landingService: LandingService);
    validateDomainForCaddy(domain: string): Promise<boolean>;
    getLandingDataByHost(host: string): Promise<{
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
    linkDomain(userId: string, dto: LinkDomainDto): Promise<import("../business-profile/entities/business-profile.entity").BusinessProfileEntity | null>;
    verifyDomainDns(userId: string): Promise<{
        success: boolean;
        domainVerified: boolean;
        message?: undefined;
    } | {
        success: boolean;
        domainVerified: boolean;
        message: string;
    }>;
}
