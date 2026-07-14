import {
  Repository,
  EntityTarget,
  DataSource,
  ObjectLiteral,
  FindOptionsWhere,
  DeepPartial,
  QueryRunner,
  SelectQueryBuilder,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BadRequestException } from "@nestjs/common";

export abstract class BaseRepository<T extends ObjectLiteral, C extends DeepPartial<T>> {
  protected readonly repository: Repository<T>;
  constructor(
    protected readonly entity: EntityTarget<T>,
    protected readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<T>(entity);
  }

  protected getActiveRepository(queryRunner?: QueryRunner): Repository<T> {
    if (queryRunner?.manager) {
      return queryRunner.manager.getRepository<T>(this.entity);
    }
    return this.repository;
  }

  deleteSensitiveData<K extends ObjectLiteral>(data: K): Partial<K> {
    try {
      const sensitiveKeys = ["password", "isActive", "createdAt", "updatedAt"];
      const result: Partial<K> = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && !sensitiveKeys.includes(key))
          result[key as keyof K] = data[key as keyof K];
      }
      return result;
    } catch {
      throw new BadRequestException("Error deleting sensitive data");
    }
  }

  find(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<T> {
    const defaultAlias = typeof this.entity === 'function' ? this.entity.name.toLowerCase().replace('entity', '') : 'entity';
    return this.getActiveRepository(queryRunner).createQueryBuilder(alias || defaultAlias);
  }

  async findById(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<T | null> {
    return await this.getActiveRepository(queryRunner).findOne({ where });
  }

  async findAll(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<T[]> {
    return await this.getActiveRepository(queryRunner).find({ where });
  }

  async create(data: C, queryRunner?: QueryRunner): Promise<T> {
    const repo = this.getActiveRepository(queryRunner);
    const entity = repo.create(data);
    return await repo.save(entity);
  }

  async createList(data: C[], queryRunner?: QueryRunner): Promise<T[]> {
    const repo = this.getActiveRepository(queryRunner);
    const entities = repo.create(data);
    return await repo.save(entities);
  }

  async updateById(
    where: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.getActiveRepository(queryRunner).update(where, data);
  }

  async update(
    where: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    await this.getActiveRepository(queryRunner).update(where, data);
  }

  async deleteById(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<void> {
    await this.getActiveRepository(queryRunner).delete(where);
  }

  async delete(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<void> {
    await this.getActiveRepository(queryRunner).delete(where);
  }
}
