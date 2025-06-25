import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const getEmailConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.get('email.host'),
    port: configService.get('email.port'),
    secure: false,
    auth: {
      user: configService.get('email.user'),
      pass: configService.get('email.pass'),
    },
    tls:{
        rejectUnauthorized: false
    }
  },
  defaults: {
    from: configService.get('email.from'),
  },
});
