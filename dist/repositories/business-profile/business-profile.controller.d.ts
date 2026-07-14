import { BusinessProfileService } from './business-profile.service';
import { SaveLandingConfigDto } from './dto/landing-config.dto';
export declare class BusinessProfileController {
    private readonly profileService;
    constructor(profileService: BusinessProfileService);
    getProfileBySlug(slug: string): Promise<import("./entities/business-profile.entity").BusinessProfileEntity>;
    getProfile(req: any): Promise<import("./entities/business-profile.entity").BusinessProfileEntity>;
    updateProfile(req: any, body: any): Promise<import("./entities/business-profile.entity").BusinessProfileEntity>;
    updateSections(req: any, sections: any[]): Promise<import("./entities/business-profile.entity").BusinessProfileEntity>;
    getLandingConfig(req: any): Promise<any[]>;
    updateLandingConfig(req: any, body: SaveLandingConfigDto): Promise<any[]>;
}
