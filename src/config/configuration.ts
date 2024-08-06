export default () => ({
  port: process.env.PORT || 3000,
  database: {
    type: process.env.DATABASE_TYPE as 'postgres' | 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
