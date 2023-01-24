import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-notfound';

interface ReadNotificationRequest {
  notificationtId: string;
}
type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationtId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationtId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
