import { Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        profile: {
            banner: string;
            products: import("@prisma/client/runtime/library").JsonValue;
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            tagline: string;
            description: string;
            phone: string;
            address: string;
            logo: string;
            slug: string;
            testimonials: import("@prisma/client/runtime/library").JsonValue;
            faqs: import("@prisma/client/runtime/library").JsonValue;
            gallery: import("@prisma/client/runtime/library").JsonValue;
            sections: import("@prisma/client/runtime/library").JsonValue;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        password: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
