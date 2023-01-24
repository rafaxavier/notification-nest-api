import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-notfound';

interface UnreadNotificationRequest {
  notificationtId: string;
}
type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationtId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationtId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
