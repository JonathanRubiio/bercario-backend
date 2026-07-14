import { DeepPartial } from 'typeorm';
import { MembershipPackageEntity } from '../entities/membership-package.entity';

export type MembershipPackageDto = DeepPartial<MembershipPackageEntity>;
