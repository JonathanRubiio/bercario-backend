import { DataSource, DeepPartial } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { LandingFaqEntity } from "../entities/landing-faq.entity";
export declare class LandingFaqRepository extends BaseRepository<LandingFaqEntity, DeepPartial<LandingFaqEntity>> {
    constructor(dataSource: DataSource);
}
