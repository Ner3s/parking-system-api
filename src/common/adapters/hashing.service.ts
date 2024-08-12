import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashingService } from '../types/hashing.interface';

@Injectable()
export class BcryptHashingService implements IHashingService {
  private readonly saltRounds = 10;

  async hash(data: string, salt?: string): Promise<string> {
    return bcrypt.hash(data, salt || this.saltRounds);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }

  async genSalt(): Promise<string> {
    return bcrypt.genSalt(this.saltRounds);
  }
}
