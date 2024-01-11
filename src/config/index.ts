export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRESIN, 10) || 86000,
  },
  sensor: {
    endpointUrl: process.env.ENDPOINT_URL,
    platform: process.env.PLATFORM,
  },
  db: {
    influx: {
      host: process.env.INFLUX_DB_HOST,
      port: parseInt(process.env.INFLUX_DB_PORT, 10) || 12528,
      protocol: process.env.INFLUX_DB_PROTOCOL,
      database: process.env.INFLUX_DB_NAME,
      user: process.env.INFLUX_DB_USER,
      password: process.env.INFLUX_DB_PASSWORD,
    },
    postgres: {
      uri: process.env.POSTGRESQL_DB_URI,
    },
    redis: {
      host: process.env.REDIS_DB_HOST,
      port: parseInt(process.env.REDIS_DB_PORT, 10) || 12528,
      user: process.env.REDIS_DB_USER,
      password: process.env.REDIS_DB_PASSWORD,
    },
  },
  mqtt: {
    host: process.env.MQTT_HOST,
    port: parseInt(process.env.MQTT_PORT, 10) || 1883,
    user: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
  }
})
