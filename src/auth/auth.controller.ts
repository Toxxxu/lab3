import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.create.dto';
import { AuthUser } from 'src/user/user.decorator';

import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(TokenInterceptor)
    register(@Body() signUp: CreateUserDto): Promise<User> {
        return this.authService.register(signUp);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TokenInterceptor)
    async login(@AuthUser() user: User): Promise<User> {
        return user;
    }

    @Get('/me')
    @UseGuards(SessionAuthGuard, JWTAuthGuard)
    me(@AuthUser() user: User): User {
        return user;
    }
}