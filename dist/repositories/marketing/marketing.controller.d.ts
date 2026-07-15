import { MarketingService } from './marketing.service';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    getSuccessStories(): Promise<import("./entities/success-story.entity").SuccessStoryEntity[]>;
    getBlogPosts(): Promise<import("./entities/blog-post.entity").BlogPostEntity[]>;
}
