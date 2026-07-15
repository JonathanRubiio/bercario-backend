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
exports.DomainController = void 0;
const common_1 = require("@nestjs/common");
const domain_service_1 = require("./domain.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const domain_config_dto_1 = require("../business-profile/dto/domain-config.dto");
let DomainController = class DomainController {
    domainService;
    constructor(domainService) {
        this.domainService = domainService;
    }
    async checkDomain(domain) {
        if (!domain) {
            throw new common_1.BadRequestException('El parámetro domain es obligatorio.');
        }
        const isAllowed = await this.domainService.validateDomainForCaddy(domain);
        if (!isAllowed) {
            throw new common_1.NotFoundException('Dominio no autorizado o no verificado para emitir SSL');
        }
        return { status: 'authorized' };
    }
    async getLandingByHost(host) {
        if (!host) {
            throw new common_1.BadRequestException('Falta la cabecera Host');
        }
        return this.domainService.getLandingDataByHost(host);
    }
    async linkDomain(req, dto) {
        return this.domainService.linkDomain(req.user.id, dto);
    }
    async verifyDomain(req) {
        return this.domainService.verifyDomainDns(req.user.id);
    }
};
exports.DomainController = DomainController;
__decorate([
    (0, common_1.Get)('domains/check'),
    __param(0, (0, common_1.Query)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "checkDomain", null);
__decorate([
    (0, common_1.Get)('public/landing/host'),
    __param(0, (0, common_1.Headers)('host')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "getLandingByHost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('profile/domain'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, domain_config_dto_1.LinkDomainDto]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "linkDomain", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('profile/domain/verify'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "verifyDomain", null);
exports.DomainController = DomainController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [domain_service_1.DomainService])
], DomainController);
//# sourceMappingURL=domain.controller.js.map