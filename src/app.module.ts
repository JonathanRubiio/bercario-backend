import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './repositories/auth/auth.module';
import { BusinessProfileModule } from './repositories/business-profile/business-profile.module';
import { LeadModule } from './repositories/lead/lead.module';
import { UploadModule } from './repositories/upload/upload.module';
import { MembershipPackageModule } from './repositories/membership-package/membership-package.module';
import { LandingModule } from './repositories/landing/landing.module';
import { DomainModule } from './repositories/domain/domain.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL || 'mysql://bercario_user:bercario_pass@localhost:3306/bercario',
      entities: [__dirname + '/repositories/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    BusinessProfileModule,
    LeadModule,
    UploadModule,
    MembershipPackageModule,
    LandingModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
