import { PrismaService } from '../prisma.service';
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getAllLeads(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        businessName: string;
        city: string;
        message: string | null;
        status: string;
    }[]>;
    updateLeadStatus(id: string, status: 'ACCEPTED' | 'REJECTED'): Promise<{
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
