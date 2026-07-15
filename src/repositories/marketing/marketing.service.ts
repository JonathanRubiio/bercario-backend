import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessStoryEntity } from './entities/success-story.entity';
import { BlogPostEntity } from './entities/blog-post.entity';

@Injectable()
export class MarketingService {
  constructor(
    @InjectRepository(SuccessStoryEntity)
    private readonly storyRepo: Repository<SuccessStoryEntity>,
    @InjectRepository(BlogPostEntity)
    private readonly blogRepo: Repository<BlogPostEntity>,
  ) {}

  async getSuccessStories(): Promise<SuccessStoryEntity[]> {
    return this.storyRepo.find({
      order: { createdAt: 'ASC' }
    });
  }

  async getBlogPosts(): Promise<BlogPostEntity[]> {
    return this.blogRepo.find({
      order: { createdAt: 'DESC' }
    });
  }
}
