import { DataSource, DeepPartial } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { LandingTestimonialEntity } from "../entities/landing-testimonial.entity";
export declare class LandingTestimonialRepository extends BaseRepository<LandingTestimonialEntity, DeepPartial<LandingTestimonialEntity>> {
    constructor(dataSource: DataSource);
}
