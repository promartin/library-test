import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException({ error: "Password doesn't match" });
    }

    const payload = { sub: user.id, username: user.username, employee: user.employee };
    return { access_token: await this.jwtService.signAsync(payload) }
  };
}
