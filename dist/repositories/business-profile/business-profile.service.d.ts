import { BusinessProfileRepository } from './repositories/business-profile.repository';
import { BusinessProfileEntity } from './entities/business-profile.entity';
export declare class BusinessProfileService {
    private readonly profileRepo;
    constructor(profileRepo: BusinessProfileRepository);
    getProfileBySlug(slug: string): Promise<BusinessProfileEntity>;
    getProfileByUserId(userId: string): Promise<BusinessProfileEntity>;
    updateProfile(userId: string, updateData: Partial<BusinessProfileEntity>): Promise<BusinessProfileEntity>;
    updateSections(userId: string, sections: any[]): Promise<BusinessProfileEntity>;
    STATIC_TEMPLATES: {
        id: string;
        name: string;
        niche: string;
        globalStyles: {
            paletteId: string;
            fontPairId: string;
            buttonStyle: string;
        };
        landingConfig: ({
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                subtitle: string;
                ctaText: string;
                ctaUrl: string;
                layoutDirection: string;
                align: string;
                description?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                items?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                description: string;
                align: string;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                items?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                description: string;
                imageUrl: string;
                ctaText: string;
                ctaUrl: string;
                layoutDirection: string;
                align: string;
                subtitle?: undefined;
                columns?: undefined;
                items?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                columns: number;
                items: {
                    title: string;
                    description: string;
                }[];
                align: string;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                description?: undefined;
                imageUrl?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                items: {
                    step: string;
                    title: string;
                    description: string;
                }[];
                align: string;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                description?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                description: string;
                signature: string;
                align: string;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                items?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                columns: number;
                items: {
                    name: string;
                    role: string;
                    comment: string;
                    rating: number;
                    avatarUrl: string;
                }[];
                align: string;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                description?: undefined;
                imageUrl?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                subtitle: string;
                ctaText: string;
                align: string;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                description?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                items?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                description: string;
                days: number;
                align: string;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                items?: undefined;
                signature?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                title: string;
                items: {
                    question: string;
                    answer: string;
                }[];
                align: string;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                description?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                signature?: undefined;
                days?: undefined;
                copyright?: undefined;
            };
        } | {
            id: string;
            type: string;
            order: number;
            visible: boolean;
            label: string;
            description: string;
            content: {
                copyright: string;
                align: string;
                title?: undefined;
                subtitle?: undefined;
                ctaText?: undefined;
                ctaUrl?: undefined;
                layoutDirection?: undefined;
                description?: undefined;
                imageUrl?: undefined;
                columns?: undefined;
                items?: undefined;
                signature?: undefined;
                days?: undefined;
            };
        })[];
    }[];
    parseNiche(profile: BusinessProfileEntity): string;
    getLandingConfig(userId: string): Promise<any>;
    updateLandingConfig(userId: string, data: any): Promise<any>;
    getTemplates(): Promise<any[]>;
}
