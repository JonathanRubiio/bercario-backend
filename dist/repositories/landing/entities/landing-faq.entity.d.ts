import { UserEntity } from '../../user/entities/user.entity';
export declare class LandingFaqEntity {
    id: string;
    userId: string;
    user: UserEntity;
    question: string;
    answer: string;
    order: number;
}
