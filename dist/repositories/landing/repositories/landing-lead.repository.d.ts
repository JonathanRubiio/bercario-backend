import { DataSource, DeepPartial } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { LandingLeadEntity } from "../entities/landing-lead.entity";
export declare class LandingLeadRepository extends BaseRepository<LandingLeadEntity, DeepPartial<LandingLeadEntity>> {
    constructor(dataSource: DataSource);
}
