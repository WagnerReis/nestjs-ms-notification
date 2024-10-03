import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'aric.hickle@ethereal.email',
          pass: 'fhRFfE56kjBWTwszKh',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
