import { BcryptHashingService } from 'src/common/adapters/hashing.service';
import { Provider } from '@nestjs/common';

export const userProviders: Provider[] = [
  {
    provide: 'HASHING_SERVICE',
    useClass: BcryptHashingService,
  },
];
