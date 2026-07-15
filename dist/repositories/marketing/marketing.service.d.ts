import { Repository } from 'typeorm';
import { SuccessStoryEntity } from './entities/success-story.entity';
import { BlogPostEntity } from './entities/blog-post.entity';
export declare class MarketingService {
    private readonly storyRepo;
    private readonly blogRepo;
    constructor(storyRepo: Repository<SuccessStoryEntity>, blogRepo: Repository<BlogPostEntity>);
    getSuccessStories(): Promise<SuccessStoryEntity[]>;
    getBlogPosts(): Promise<BlogPostEntity[]>;
}
