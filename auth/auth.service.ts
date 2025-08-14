import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signup(dto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.usersService.create({ ...dto, password: hashed });
  }

  async login(dto) {
    const user: any = await this.usersService.findByEmail(dto.email);

    if (user && await bcrypt.compare(dto.password, user.password)) {
      const payload = {
        sub: user._id.toString(), // unique identifier
        email: user.email,
        role: user.role
      };

      return { access_token: this.jwtService.sign(payload) };
    }

    return null;
  }
}
