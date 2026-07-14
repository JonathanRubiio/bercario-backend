import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: UserRepository, jwtService: JwtService);
    login(email: string, pass: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            businessSlug: string | undefined;
        };
    }>;
    validateUserById(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        businessSlug: string | undefined;
    }>;
}
