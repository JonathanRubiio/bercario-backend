import { Controller, Get } from '@nestjs/common';
import { MarketingService } from './marketing.service';

@Controller('api/public')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get('success-stories')
  async getSuccessStories() {
    return this.marketingService.getSuccessStories();
  }

  @Get('blog-posts')
  async getBlogPosts() {
    return this.marketingService.getBlogPosts();
  }
}
