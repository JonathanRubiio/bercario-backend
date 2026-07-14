import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { BusinessProfileEntity } from "../entities/business-profile.entity";
import { BusinessProfileDto } from "../dto/business-profile.entity.dto";

@Injectable()
export class BusinessProfileRepository extends BaseRepository<BusinessProfileEntity, BusinessProfileDto> {
  constructor(dataSource: DataSource) {
    super(BusinessProfileEntity, dataSource);
  }
}
