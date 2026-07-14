import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            businessSlug: string | undefined;
        };
    }>;
    getMe(req: any): Promise<any>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
}
