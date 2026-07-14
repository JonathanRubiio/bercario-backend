import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    createLead(body: any): Promise<{
        success: boolean;
        message: string;
        leadId?: undefined;
    } | {
        success: boolean;
        leadId: string;
        message?: undefined;
    }>;
    getAllLeads(req: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        city: string;
        message: string | null;
        status: string;
    }[]>;
    updateLeadStatus(id: string, status: 'ACCEPTED' | 'REJECTED', req: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        city: string;
        message: string | null;
        status: string;
    }>;
}
