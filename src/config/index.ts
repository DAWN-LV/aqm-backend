export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRESIN, 10) || 86000
  },
  db: {
    url: process.env.DB_URL,
    token: process.env.DB_TOKEN
  }
});
