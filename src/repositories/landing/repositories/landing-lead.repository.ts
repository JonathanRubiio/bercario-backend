import { Injectable } from "@nestjs/common";
import { DataSource, DeepPartial } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { LandingLeadEntity } from "../entities/landing-lead.entity";

@Injectable()
export class LandingLeadRepository extends BaseRepository<LandingLeadEntity, DeepPartial<LandingLeadEntity>> {
  constructor(dataSource: DataSource) {
    super(LandingLeadEntity, dataSource);
  }
}
