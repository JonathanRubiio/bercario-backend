import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "../../../common/repositories/base.repository";
import { UserEntity } from "../entities/user.entity";
import { UserDto } from "../dto/user.entity.dto";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, UserDto> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
