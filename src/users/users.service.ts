import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IHashingService } from 'src/common/types/hashing.interface';
import { AlreadyExists } from 'src/common/errors/already-exists';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('HASHING_SERVICE')
    private readonly hashingService: IHashingService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await this.hashingService.genSalt();
    const hashedPassword = await this.hashPassword(
      createUserDto.password,
      salt,
    );

    const user = this.usersRepository.create({
      email: createUserDto.password,
      name: createUserDto.name,
      password: hashedPassword,
      salt,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new AlreadyExists('Email');
      }
      throw error;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    const hash = await this.hashPassword(password, user.salt);
    return hash === user.password;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return this.hashingService.hash(password, salt);
  }
}
