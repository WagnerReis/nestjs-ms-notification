import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

type NotificationPayload = {
  email: string;
  startAt: string;
  endAt: string;
  name: string;
  title: string;
  description: string;
};

@Controller()
export class AppController {
  constructor(private mailerService: MailerService) {}

  @EventPattern('task_notification')
  async taskNotification(data: NotificationPayload) {
    console.log('Received task notification:', data);
    const result = await this.mailerService.sendMail({
      to: data.email,
      subject: 'Task Notification',
      html: `
        <body>
          <h1> Olá ${data.name}</h1>

          <span>Voce tem uma tarefa para hoje</span>
          </br>
          <span>Titulo: ${data.title}</span>
          </br>
          <span>Descrição: ${data.description}</span>
          </br>
          <span>Inicia em: ${data.startAt}</span>
          </br>
          <span>Termina em: ${data.endAt}</span>
        </body>
      `,
      from: 'taskManager@nestjscourse.com.br',
    });
    console.log(result);
  }
}
