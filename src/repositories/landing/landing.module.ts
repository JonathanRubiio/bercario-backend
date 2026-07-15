import { Module } from '@nestjs/common';
import { LandingController } from './landing.controller';
import { LandingService } from './landing.service';
import { LandingLeadRepository } from './repositories/landing-lead.repository';
import { LandingFaqRepository } from './repositories/landing-faq.repository';
import { LandingTestimonialRepository } from './repositories/landing-testimonial.repository';
import { BusinessProfileModule } from '../business-profile/business-profile.module';

@Module({
  imports: [BusinessProfileModule],
  controllers: [LandingController],
  providers: [
    LandingService,
    LandingLeadRepository,
    LandingFaqRepository,
    LandingTestimonialRepository,
  ],
  exports: [
    LandingService,
    LandingLeadRepository,
    LandingFaqRepository,
    LandingTestimonialRepository,
  ],
})
export class LandingModule {}
