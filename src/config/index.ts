export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRESIN, 10) || 86000,
  },
  db: {
    influx: {
      host: process.env.INFLUX_DB_HOST,
      port: parseInt(process.env.INFLUX_DB_PORT),
      protocol: process.env.INFLUX_DB_PROTOCOL,
      database: process.env.INFLUX_DB_NAME,
      username: process.env.INFLUX_DB_USER,
      password: process.env.INFLUX_DB_PASSWORD,
    },
    postgres: {
      uri: process.env.POSTGRESQL_DB_URI,
    },
    redis: {
      host: process.env.REDIS_DB_HOST,
      port: process.env.REDIS_DB_PORT,
      user: process.env.REDIS_DB_USER,
      password: process.env.REDIS_DB_PASSWORD,
    }
  },
})
