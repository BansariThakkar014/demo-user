export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),

  database: {
    type : process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST ,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD ,
    database: process.env.DATABASE_NAME,
  },

  jwt:{
    jwt_secret:process.env.JWT_SECRET,
    expiresIn:process.env.JWT_EXPIRES_IN
  },
  email:{
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    user:process.env.MAIL_USER,
    pass:process.env.MAIL_PASS,
    from:process.env.MAIL_FROM
  }
});
