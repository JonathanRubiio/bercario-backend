import { UserEntity } from '../../user/entities/user.entity';
export declare class BusinessProfileEntity {
    id: string;
    userId: string;
    user: UserEntity;
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
    testimonials: any[];
    faqs: any[];
    gallery: string[];
    sections: any[];
    landingConfig: any[];
    createdAt: Date;
    updatedAt: Date;
}
