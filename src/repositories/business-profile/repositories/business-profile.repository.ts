import { Injectable } from "@nestjs/common";
import { DataSource, FindOptionsWhere, QueryRunner } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { BusinessProfileEntity } from "../entities/business-profile.entity";
import { BusinessProfileDto } from "../dto/business-profile.entity.dto";

@Injectable()
export class BusinessProfileRepository extends BaseRepository<BusinessProfileEntity, BusinessProfileDto> {
  constructor(dataSource: DataSource) {
    super(BusinessProfileEntity, dataSource);
  }

  override async findById(
    where: FindOptionsWhere<BusinessProfileEntity>[] | FindOptionsWhere<BusinessProfileEntity>,
    queryRunner?: QueryRunner,
  ): Promise<BusinessProfileEntity | null> {
    return await this.getActiveRepository(queryRunner).findOne({
      where,
      relations: {
        user: {
          membershipPackage: true,
        },
      },
    });
  }
}
