import { BusinessProfileRepository } from './repositories/business-profile.repository';
import { BusinessProfileEntity } from './entities/business-profile.entity';
export declare class BusinessProfileService {
    private readonly profileRepo;
    constructor(profileRepo: BusinessProfileRepository);
    getProfileBySlug(slug: string): Promise<BusinessProfileEntity>;
    getProfileByUserId(userId: string): Promise<BusinessProfileEntity>;
    updateProfile(userId: string, updateData: Partial<BusinessProfileEntity>): Promise<BusinessProfileEntity>;
    updateSections(userId: string, sections: any[]): Promise<BusinessProfileEntity>;
    getInitialLandingConfig(profile: BusinessProfileEntity): ({
        id: string;
        type: string;
        order: number;
        visible: boolean;
        content: {
            title: string;
            tagline: string;
            bgGradientFrom: string;
            bgGradientTo: string;
            textColor: string;
            description?: undefined;
            showPrice?: undefined;
            buttonText?: undefined;
            phone?: undefined;
            email?: undefined;
            address?: undefined;
        };
    } | {
        id: string;
        type: string;
        order: number;
        visible: boolean;
        content: {
            title: string;
            description: string;
            bgGradientFrom: string;
            bgGradientTo: string;
            tagline?: undefined;
            textColor?: undefined;
            showPrice?: undefined;
            buttonText?: undefined;
            phone?: undefined;
            email?: undefined;
            address?: undefined;
        };
    } | {
        id: string;
        type: string;
        order: number;
        visible: boolean;
        content: {
            title: string;
            showPrice: boolean;
            buttonText: string;
            tagline?: undefined;
            bgGradientFrom?: undefined;
            bgGradientTo?: undefined;
            textColor?: undefined;
            description?: undefined;
            phone?: undefined;
            email?: undefined;
            address?: undefined;
        };
    } | {
        id: string;
        type: string;
        order: number;
        visible: boolean;
        content: {
            title: string;
            phone: string;
            email: string;
            address: string;
            tagline?: undefined;
            bgGradientFrom?: undefined;
            bgGradientTo?: undefined;
            textColor?: undefined;
            description?: undefined;
            showPrice?: undefined;
            buttonText?: undefined;
        };
    })[];
    getLandingConfig(userId: string): Promise<any[]>;
    updateLandingConfig(userId: string, config: any[]): Promise<any[]>;
}
