import { LeadRepository } from './repositories/lead.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { BusinessProfileRepository } from '../business-profile/repositories/business-profile.repository';
export declare class LeadService {
    private readonly leadRepo;
    private readonly userRepo;
    private readonly profileRepo;
    constructor(leadRepo: LeadRepository, userRepo: UserRepository, profileRepo: BusinessProfileRepository);
    createLead(data: {
        businessName: string;
        email: string;
        city: string;
        message?: string;
        website?: string;
    }): Promise<{
        success: boolean;
        message: string;
        leadId?: undefined;
    } | {
        success: boolean;
        leadId: string;
        message?: undefined;
    }>;
    getAllLeads(): Promise<import("./entities/lead.entity").LeadEntity[]>;
    updateLeadStatus(id: string, status: 'ACCEPTED' | 'REJECTED'): Promise<import("./entities/lead.entity").LeadEntity>;
}
