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
exports.LandingController = void 0;
const common_1 = require("@nestjs/common");
const landing_service_1 = require("./landing.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const landing_dto_1 = require("./dto/landing.dto");
const landing_config_dto_1 = require("../business-profile/dto/landing-config.dto");
let LandingController = class LandingController {
    landingService;
    constructor(landingService) {
        this.landingService = landingService;
    }
    async getPublicLandingData(slug) {
        return this.landingService.getPublicLandingData(slug);
    }
    async createLead(slug, body) {
        return this.landingService.createLead(slug, body);
    }
    async saveLandingConfig(req, body) {
        return this.landingService.saveLandingConfig(req.user.id, body);
    }
    async getLeads(req) {
        return this.landingService.getLeadsByUser(req.user.id);
    }
};
exports.LandingController = LandingController;
__decorate([
    (0, common_1.Get)('public/landing/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LandingController.prototype, "getPublicLandingData", null);
__decorate([
    (0, common_1.Post)('public/landing/:slug/lead'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, landing_dto_1.CreateLeadDto]),
    __metadata("design:returntype", Promise)
], LandingController.prototype, "createLead", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('platform/landing/config'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, landing_config_dto_1.UpdateLandingConfigDto]),
    __metadata("design:returntype", Promise)
], LandingController.prototype, "saveLandingConfig", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('platform/landing/leads'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LandingController.prototype, "getLeads", null);
exports.LandingController = LandingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [landing_service_1.LandingService])
], LandingController);
//# sourceMappingURL=landing.controller.js.map