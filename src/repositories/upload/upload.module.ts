import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UserModule } from '../user/user.module';
import { BusinessProfileModule } from '../business-profile/business-profile.module';

@Module({
  imports: [UserModule, BusinessProfileModule],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
