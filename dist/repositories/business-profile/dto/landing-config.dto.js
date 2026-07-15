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
exports.UpdateLandingConfigDto = exports.GlobalStylesDto = exports.LandingConfigItemDto = exports.ColumnDto = exports.ElementDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ElementDto {
    id;
    type;
    content;
    styles;
}
exports.ElementDto = ElementDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ElementDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ElementDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ElementDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ElementDto.prototype, "styles", void 0);
class ColumnDto {
    id;
    width;
    elements;
}
exports.ColumnDto = ColumnDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ColumnDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ColumnDto.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ElementDto),
    __metadata("design:type", Array)
], ColumnDto.prototype, "elements", void 0);
class LandingConfigItemDto {
    id;
    type;
    order;
    visible;
    label;
    description;
    styles;
    columns;
    content;
}
exports.LandingConfigItemDto = LandingConfigItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LandingConfigItemDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LandingConfigItemDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LandingConfigItemDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LandingConfigItemDto.prototype, "visible", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LandingConfigItemDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LandingConfigItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LandingConfigItemDto.prototype, "styles", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ColumnDto),
    __metadata("design:type", Array)
], LandingConfigItemDto.prototype, "columns", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LandingConfigItemDto.prototype, "content", void 0);
class GlobalStylesDto {
    paletteId;
    fontPairId;
    buttonStyle;
}
exports.GlobalStylesDto = GlobalStylesDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GlobalStylesDto.prototype, "paletteId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GlobalStylesDto.prototype, "fontPairId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['rounded', 'square', 'pill']),
    __metadata("design:type", String)
], GlobalStylesDto.prototype, "buttonStyle", void 0);
class UpdateLandingConfigDto {
    templateId;
    landingConfig;
    globalStyles;
}
exports.UpdateLandingConfigDto = UpdateLandingConfigDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLandingConfigDto.prototype, "templateId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LandingConfigItemDto),
    __metadata("design:type", Array)
], UpdateLandingConfigDto.prototype, "landingConfig", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => GlobalStylesDto),
    __metadata("design:type", GlobalStylesDto)
], UpdateLandingConfigDto.prototype, "globalStyles", void 0);
//# sourceMappingURL=landing-config.dto.js.map