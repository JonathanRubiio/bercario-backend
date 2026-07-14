import { BusinessProfileEntity } from '../../business-profile/entities/business-profile.entity';
import { MembershipPackageEntity } from '../../membership-package/entities/membership-package.entity';
export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    membershipPackageId: string;
    membershipPackage: MembershipPackageEntity;
    profile: BusinessProfileEntity;
    createdAt: Date;
    updatedAt: Date;
}
