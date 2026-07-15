"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingModule = void 0;
const common_1 = require("@nestjs/common");
const landing_controller_1 = require("./landing.controller");
const landing_service_1 = require("./landing.service");
const landing_lead_repository_1 = require("./repositories/landing-lead.repository");
const landing_faq_repository_1 = require("./repositories/landing-faq.repository");
const landing_testimonial_repository_1 = require("./repositories/landing-testimonial.repository");
const business_profile_module_1 = require("../business-profile/business-profile.module");
let LandingModule = class LandingModule {
};
exports.LandingModule = LandingModule;
exports.LandingModule = LandingModule = __decorate([
    (0, common_1.Module)({
        imports: [business_profile_module_1.BusinessProfileModule],
        controllers: [landing_controller_1.LandingController],
        providers: [
            landing_service_1.LandingService,
            landing_lead_repository_1.LandingLeadRepository,
            landing_faq_repository_1.LandingFaqRepository,
            landing_testimonial_repository_1.LandingTestimonialRepository,
        ],
        exports: [
            landing_service_1.LandingService,
            landing_lead_repository_1.LandingLeadRepository,
            landing_faq_repository_1.LandingFaqRepository,
            landing_testimonial_repository_1.LandingTestimonialRepository,
        ],
    })
], LandingModule);
//# sourceMappingURL=landing.module.js.map