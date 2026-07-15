import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuccessStoryEntity } from './entities/success-story.entity';
import { BlogPostEntity } from './entities/blog-post.entity';
import { MarketingService } from './marketing.service';
import { MarketingController } from './marketing.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuccessStoryEntity, BlogPostEntity]),
  ],
  controllers: [MarketingController],
  providers: [MarketingService],
  exports: [MarketingService],
})
export class MarketingModule {}
