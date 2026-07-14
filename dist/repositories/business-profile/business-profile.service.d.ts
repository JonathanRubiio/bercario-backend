import { BusinessProfileRepository } from './repositories/business-profile.repository';
import { BusinessProfileEntity } from './entities/business-profile.entity';
export declare class BusinessProfileService {
    private readonly profileRepo;
    constructor(profileRepo: BusinessProfileRepository);
    getProfileBySlug(slug: string): Promise<BusinessProfileEntity>;
    getProfileByUserId(userId: string): Promise<BusinessProfileEntity>;
    updateProfile(userId: string, updateData: Partial<BusinessProfileEntity>): Promise<BusinessProfileEntity>;
    updateSections(userId: string, sections: any[]): Promise<BusinessProfileEntity>;
}
