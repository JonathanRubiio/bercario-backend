import { UserEntity } from '../../user/entities/user.entity';
export declare class LandingLeadEntity {
    id: string;
    userId: string;
    user: UserEntity;
    name: string;
    email: string;
    phone: string;
    metadata: any;
    createdAt: Date;
}
