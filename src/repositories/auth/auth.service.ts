import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repositories/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userRepo.find()
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessSlug: user.profile?.slug || undefined,
      },
    };
  }

  async validateUserById(userId: string) {
    const user = await this.userRepo.find()
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      businessSlug: user.profile?.slug || undefined,
    };
  }
}
