"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const common_1 = require("@nestjs/common");
class BaseRepository {
    entity;
    dataSource;
    repository;
    constructor(entity, dataSource) {
        this.entity = entity;
        this.dataSource = dataSource;
        this.repository = dataSource.getRepository(entity);
    }
    getActiveRepository(queryRunner) {
        if (queryRunner?.manager) {
            return queryRunner.manager.getRepository(this.entity);
        }
        return this.repository;
    }
    deleteSensitiveData(data) {
        try {
            const sensitiveKeys = ["password", "isActive", "createdAt", "updatedAt"];
            const result = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key) && !sensitiveKeys.includes(key))
                    result[key] = data[key];
            }
            return result;
        }
        catch {
            throw new common_1.BadRequestException("Error deleting sensitive data");
        }
    }
    find(alias, queryRunner) {
        const defaultAlias = typeof this.entity === 'function' ? this.entity.name.toLowerCase().replace('entity', '') : 'entity';
        return this.getActiveRepository(queryRunner).createQueryBuilder(alias || defaultAlias);
    }
    async findById(where, queryRunner) {
        return await this.getActiveRepository(queryRunner).findOne({ where });
    }
    async findAll(where, queryRunner) {
        return await this.getActiveRepository(queryRunner).find({ where });
    }
    async create(data, queryRunner) {
        const repo = this.getActiveRepository(queryRunner);
        const entity = repo.create(data);
        return await repo.save(entity);
    }
    async createList(data, queryRunner) {
        const repo = this.getActiveRepository(queryRunner);
        const entities = repo.create(data);
        return await repo.save(entities);
    }
    async updateById(where, data, queryRunner) {
        await this.getActiveRepository(queryRunner).update(where, data);
    }
    async update(where, data, queryRunner) {
        await this.getActiveRepository(queryRunner).update(where, data);
    }
    async deleteById(where, queryRunner) {
        await this.getActiveRepository(queryRunner).delete(where);
    }
    async delete(where, queryRunner) {
        await this.getActiveRepository(queryRunner).delete(where);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map