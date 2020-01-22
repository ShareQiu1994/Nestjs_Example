import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthTokenDto } from './DTO/auth-token-dto';

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authTokenDto: AuthTokenDto): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    return this.jwtService.sign(authTokenDto);
  }

  async verify(token: string): Promise<any> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    return this.jwtService.verify(token);
  }

  async validateUser(payload: any): Promise<any> {
    // return await this.usersService.findOneByEmail(payload.email);
    return payload;
  }
}
