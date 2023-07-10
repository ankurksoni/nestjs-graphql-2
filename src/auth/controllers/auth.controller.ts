import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { GetUser } from "../decorators/getuser.decorator";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { LoginDTO } from "./dtos/login.dto";
import { AuthService } from "./services/auth.service";

@Controller("/auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }

    @Post("/login")
    login(
        @Body()
        loginDTO: LoginDTO
    ) {
        return this.authService.login(loginDTO);
    }

    @Get("/profile")
    @UseGuards(JwtAuthGuard)
    profile(
        // @Req() res: Request
        @GetUser() user: User
    ) {
        return user;
    }
}