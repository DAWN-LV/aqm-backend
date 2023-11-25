export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRESIN, 10) || 86000,
  },
  db: {
    influx: {
      url: process.env.INFLUX_DB_URL,
      token: process.env.INFLUX_DB_TOKEN,
    },
    postgres: {
      uri: process.env.POSTGRESQL_DB_URI,
    }
  },
})
