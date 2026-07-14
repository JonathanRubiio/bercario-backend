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
exports.LeadController = void 0;
const common_1 = require("@nestjs/common");
const lead_service_1 = require("./lead.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const throttler_1 = require("@nestjs/throttler");
let LeadController = class LeadController {
    leadService;
    constructor(leadService) {
        this.leadService = leadService;
    }
    async createLead(body) {
        return this.leadService.createLead(body);
    }
    async getAllLeads(req) {
        if (req.user.role !== 'admin') {
            throw new common_1.ForbiddenException('No tienes permisos para ver las solicitudes.');
        }
        return this.leadService.getAllLeads();
    }
    async updateLeadStatus(id, status, req) {
        if (req.user.role !== 'admin') {
            throw new common_1.ForbiddenException('No tienes permisos para gestionar solicitudes.');
        }
        return this.leadService.updateLeadStatus(id, status);
    }
};
exports.LeadController = LeadController;
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Post)('leads'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "createLead", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/leads'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "getAllLeads", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('admin/leads/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LeadController.prototype, "updateLeadStatus", null);
exports.LeadController = LeadController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [lead_service_1.LeadService])
], LeadController);
//# sourceMappingURL=lead.controller.js.map