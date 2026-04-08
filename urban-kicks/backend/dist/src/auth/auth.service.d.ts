import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    private signToken;
}
