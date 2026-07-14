import { BusinessProfileEntity } from '../../business-profile/entities/business-profile.entity';
export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    profile: BusinessProfileEntity;
    createdAt: Date;
    updatedAt: Date;
}
