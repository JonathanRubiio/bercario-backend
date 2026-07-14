import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { LeadEntity } from "../entities/lead.entity";
import { LeadDto } from "../dto/lead.entity.dto";

@Injectable()
export class LeadRepository extends BaseRepository<LeadEntity, LeadDto> {
  constructor(dataSource: DataSource) {
    super(LeadEntity, dataSource);
  }
}
