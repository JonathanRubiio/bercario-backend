import { UserEntity } from '../../user/entities/user.entity';
export declare class LandingTestimonialEntity {
    id: string;
    userId: string;
    user: UserEntity;
    clientName: string;
    clientRole: string;
    comment: string;
    rating: number;
    avatarUrl: string;
    order: number;
}
