import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'pguser',
        password: 'pgpassword',
        database: 'nestjs',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // TODO - SET ENV TO FALSE IN PRODUCTION
      });

      return dataSource.initialize();
    },
  },
];
