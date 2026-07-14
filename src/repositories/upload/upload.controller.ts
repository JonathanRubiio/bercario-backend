import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException, Query, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('type') type: string,
    @Request() req: any,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo');
    }

    if (type === 'catalog') {
      await this.uploadService.validateCatalogLimit(req.user.id);
    }

    const url = await this.uploadService.uploadFile(file);
    return { url };
  }
}
