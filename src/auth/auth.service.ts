import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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

    return user;
  }
}
