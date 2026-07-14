import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { MembershipPackageEntity } from "../entities/membership-package.entity";
import { MembershipPackageDto } from "../dto/membership-package.dto";

@Injectable()
export class MembershipPackageRepository extends BaseRepository<MembershipPackageEntity, MembershipPackageDto> {
  constructor(dataSource: DataSource) {
    super(MembershipPackageEntity, dataSource);
  }
}
