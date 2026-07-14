import { OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { BusinessProfileRepository } from '../business-profile/repositories/business-profile.repository';
export declare class UploadService implements OnModuleInit {
    private readonly userRepo;
    private readonly profileRepo;
    private s3Client;
    private bucket;
    constructor(userRepo: UserRepository, profileRepo: BusinessProfileRepository);
    validateCatalogLimit(userId: string): Promise<void>;
    onModuleInit(): Promise<void>;
    uploadFile(file: Express.Multer.File): Promise<string>;
}
