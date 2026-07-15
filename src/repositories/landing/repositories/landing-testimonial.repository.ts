import { Injectable } from "@nestjs/common";
import { DataSource, DeepPartial } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { LandingTestimonialEntity } from "../entities/landing-testimonial.entity";

@Injectable()
export class LandingTestimonialRepository extends BaseRepository<LandingTestimonialEntity, DeepPartial<LandingTestimonialEntity>> {
  constructor(dataSource: DataSource) {
    super(LandingTestimonialEntity, dataSource);
  }
}
