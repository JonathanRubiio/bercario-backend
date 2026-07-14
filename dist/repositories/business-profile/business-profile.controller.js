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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessProfileController = void 0;
const common_1 = require("@nestjs/common");
const business_profile_service_1 = require("./business-profile.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const landing_config_dto_1 = require("./dto/landing-config.dto");
let BusinessProfileController = class BusinessProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfileBySlug(slug) {
        return this.profileService.getProfileBySlug(slug);
    }
    async getProfile(req) {
        return this.profileService.getProfileByUserId(req.user.id);
    }
    async updateProfile(req, body) {
        return this.profileService.updateProfile(req.user.id, body);
    }
    async updateSections(req, sections) {
        return this.profileService.updateSections(req.user.id, sections);
    }
    async getLandingConfig(req) {
        return this.profileService.getLandingConfig(req.user.id);
    }
    async updateLandingConfig(req, body) {
        return this.profileService.updateLandingConfig(req.user.id, body.config);
    }
};
exports.BusinessProfileController = BusinessProfileController;
__decorate([
    (0, common_1.Get)('profiles/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "getProfileBySlug", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('profile/sections'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('sections')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "updateSections", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('landing-page/config'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "getLandingConfig", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('landing-page/config'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, landing_config_dto_1.SaveLandingConfigDto]),
    __metadata("design:returntype", Promise)
], BusinessProfileController.prototype, "updateLandingConfig", null);
exports.BusinessProfileController = BusinessProfileController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [business_profile_service_1.BusinessProfileService])
], BusinessProfileController);
//# sourceMappingURL=business-profile.controller.js.map