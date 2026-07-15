import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { BusinessProfileModule } from '../business-profile/business-profile.module';
import { LandingModule } from '../landing/landing.module';

@Module({
  imports: [BusinessProfileModule, LandingModule],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
