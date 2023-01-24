import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/services/send-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    // console.log(body);
    const { recipientId, content, category } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return notification;
  }
}
