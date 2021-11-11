import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService) {
  }

  generateJwtToken(user: { id: number, email: string }) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }

  async login(user: User) {
    return {
      accessToken: this.generateJwtToken(user),
    };
  }

  async register(dto: CreateUserDto) {
    const { password, ...user } = await this.usersService.create(dto);
    return {
      ...user,
      token: this.generateJwtToken(user)
    };
  }
}
