import { Module } from '@nestjs/common';
import { BusinessProfileService } from './business-profile.service';
import { BusinessProfileController } from './business-profile.controller';
import { BusinessProfileRepository } from './repositories/business-profile.repository';

@Module({
  controllers: [BusinessProfileController],
  providers: [BusinessProfileService, BusinessProfileRepository],
  exports: [BusinessProfileService, BusinessProfileRepository],
})
export class BusinessProfileModule {}
