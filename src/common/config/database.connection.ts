import configuration from 'src/common/config/configuration';

export const databaseConnection = () => ({
  type: configuration().database.type,
  host: configuration().database.host,
  port: configuration().database.port,
  username: configuration().database.username,
  password: configuration().database.password,
  database: configuration().database.database,
  synchronize: configuration().env !== 'production' ? true : false,
  autoLoadEntities: true,
});
