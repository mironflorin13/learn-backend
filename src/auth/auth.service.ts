import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userName: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    console.log(userName);
    console.log(pass);
    const user = await this.usersService.findOne(userName);

    console.log(process.env.SECRET_KEY);
    if (user?.password !== pass) {
      console.log(user?.password);
      console.log(pass);
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
