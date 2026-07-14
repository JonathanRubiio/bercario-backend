import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { LeadRepository } from './repositories/lead.repository';
import { UserModule } from '../user/user.module';
import { BusinessProfileModule } from '../business-profile/business-profile.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    UserModule,
    BusinessProfileModule,
  ],
  controllers: [LeadController],
  providers: [LeadService, LeadRepository],
  exports: [LeadService, LeadRepository],
})
export class LeadModule {}
