import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { NotificationNotFound } from './errors/notification-notfound';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  test('should be able to unread notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('conteudo qualquer'),
      recipientId: 'teste-recipient-id',
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationtId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  test('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationtId: 'fake-notification-id-dsds',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
