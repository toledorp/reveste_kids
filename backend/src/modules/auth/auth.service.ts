import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

type GoogleUserPayload = {
  email: string;
  name: string;
  googleId?: string;
  avatar?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: GoogleUserPayload) {
    const user = await this.usersService.findOrCreateGoogleUser({
      email: googleUser.email,
      name: googleUser.name,
      googleId: googleUser.googleId,
      avatar: googleUser.avatar,
    });

    return user;
  }

  login(user: { _id: string; email: string; name: string }) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
