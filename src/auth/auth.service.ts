import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDTO) {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException('Email Not Found');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      signInDto.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = { id: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
