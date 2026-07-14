"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const lead_service_1 = require("./lead.service");
const lead_controller_1 = require("./lead.controller");
const lead_repository_1 = require("./repositories/lead.repository");
const user_module_1 = require("../user/user.module");
const business_profile_module_1 = require("../business-profile/business-profile.module");
let LeadModule = class LeadModule {
};
exports.LeadModule = LeadModule;
exports.LeadModule = LeadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 10,
                }]),
            user_module_1.UserModule,
            business_profile_module_1.BusinessProfileModule,
        ],
        controllers: [lead_controller_1.LeadController],
        providers: [lead_service_1.LeadService, lead_repository_1.LeadRepository],
        exports: [lead_service_1.LeadService, lead_repository_1.LeadRepository],
    })
], LeadModule);
//# sourceMappingURL=lead.module.js.map