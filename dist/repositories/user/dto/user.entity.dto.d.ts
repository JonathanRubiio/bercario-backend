import { DeepPartial } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
export type UserDto = DeepPartial<UserEntity>;
