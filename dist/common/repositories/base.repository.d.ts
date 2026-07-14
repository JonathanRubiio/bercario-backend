import { Repository, EntityTarget, DataSource, ObjectLiteral, FindOptionsWhere, DeepPartial, QueryRunner, SelectQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
export declare abstract class BaseRepository<T extends ObjectLiteral, C extends DeepPartial<T>> {
    protected readonly entity: EntityTarget<T>;
    protected readonly dataSource: DataSource;
    protected readonly repository: Repository<T>;
    constructor(entity: EntityTarget<T>, dataSource: DataSource);
    protected getActiveRepository(queryRunner?: QueryRunner): Repository<T>;
    deleteSensitiveData<K extends ObjectLiteral>(data: K): Partial<K>;
    find(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<T>;
    findById(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<T | null>;
    findAll(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<T[]>;
    create(data: C, queryRunner?: QueryRunner): Promise<T>;
    createList(data: C[], queryRunner?: QueryRunner): Promise<T[]>;
    updateById(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>, queryRunner?: QueryRunner): Promise<void>;
    update(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>, queryRunner?: QueryRunner): Promise<void>;
    deleteById(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<void>;
    delete(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<void>;
}
