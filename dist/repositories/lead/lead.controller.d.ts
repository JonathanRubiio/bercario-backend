import { LeadService } from './lead.service';
export declare class LeadController {
    private readonly leadService;
    constructor(leadService: LeadService);
    createLead(body: any): Promise<{
        success: boolean;
        message: string;
        leadId?: undefined;
    } | {
        success: boolean;
        leadId: string;
        message?: undefined;
    }>;
    getAllLeads(req: any): Promise<import("./entities/lead.entity").LeadEntity[]>;
    updateLeadStatus(id: string, status: 'ACCEPTED' | 'REJECTED', req: any): Promise<import("./entities/lead.entity").LeadEntity>;
}
