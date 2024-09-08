import { BadRequestException } from '@nestjs/common';

export class AlreadyExists extends BadRequestException {
  constructor(entity: string) {
    super(`${entity} already exists`);
  }
}
