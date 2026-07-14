import { Module } from '@nestjs/common';
import { MembershipPackageRepository } from './repositories/membership-package.repository';

@Module({
  providers: [MembershipPackageRepository],
  exports: [MembershipPackageRepository],
})
export class MembershipPackageModule {}
