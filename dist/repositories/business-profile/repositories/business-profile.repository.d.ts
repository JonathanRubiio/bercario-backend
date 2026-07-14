import { DataSource, FindOptionsWhere, QueryRunner } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { BusinessProfileEntity } from "../entities/business-profile.entity";
import { BusinessProfileDto } from "../dto/business-profile.entity.dto";
export declare class BusinessProfileRepository extends BaseRepository<BusinessProfileEntity, BusinessProfileDto> {
    constructor(dataSource: DataSource);
    findById(where: FindOptionsWhere<BusinessProfileEntity>[] | FindOptionsWhere<BusinessProfileEntity>, queryRunner?: QueryRunner): Promise<BusinessProfileEntity | null>;
}
