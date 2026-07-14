import { DataSource } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { MembershipPackageEntity } from "../entities/membership-package.entity";
import { MembershipPackageDto } from "../dto/membership-package.dto";
export declare class MembershipPackageRepository extends BaseRepository<MembershipPackageEntity, MembershipPackageDto> {
    constructor(dataSource: DataSource);
}
