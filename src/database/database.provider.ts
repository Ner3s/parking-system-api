import configuration from 'src/config/configuration';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: configuration().database.type,
        host: configuration().database.host,
        port: configuration().database.port,
        username: configuration().database.username,
        password: configuration().database.password,
        database: configuration().database.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // TODO - SET ENV TO FALSE IN PRODUCTION
      });

      console.log('Database connected');

      return dataSource.initialize();
    },
  },
];
