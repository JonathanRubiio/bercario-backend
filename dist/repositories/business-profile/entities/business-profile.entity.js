"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
let BusinessProfileEntity = class BusinessProfileEntity {
    id;
    userId;
    user;
    name;
    tagline;
    description;
    phone;
    email;
    address;
    banner;
    logo;
    slug;
    products;
    testimonials;
    faqs;
    gallery;
    sections;
    createdAt;
    updatedAt;
};
exports.BusinessProfileEntity = BusinessProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.profile, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], BusinessProfileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "tagline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "banner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], BusinessProfileEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], BusinessProfileEntity.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], BusinessProfileEntity.prototype, "testimonials", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], BusinessProfileEntity.prototype, "faqs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], BusinessProfileEntity.prototype, "gallery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], BusinessProfileEntity.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusinessProfileEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusinessProfileEntity.prototype, "updatedAt", void 0);
exports.BusinessProfileEntity = BusinessProfileEntity = __decorate([
    (0, typeorm_1.Entity)('business_profile')
], BusinessProfileEntity);
//# sourceMappingURL=business-profile.entity.js.map