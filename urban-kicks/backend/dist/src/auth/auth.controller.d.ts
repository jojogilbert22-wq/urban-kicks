import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        email: string;
        role: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        email: string;
        role: string;
    }>;
}
