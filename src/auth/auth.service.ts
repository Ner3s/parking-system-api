import { Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDto: SignInDTO) {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      signInDto.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
