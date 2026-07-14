import { DataSource } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { UserEntity } from "../entities/user.entity";
import { UserDto } from "../dto/user.entity.dto";
export declare class UserRepository extends BaseRepository<UserEntity, UserDto> {
    constructor(dataSource: DataSource);
}
