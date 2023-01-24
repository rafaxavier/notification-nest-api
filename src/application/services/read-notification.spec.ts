import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { NotificationNotFound } from './errors/notification-notfound';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  test('should be able to read notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('conteudo qualquer'),
      recipientId: 'teste-recipient-id',
    });

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationtId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationtId: 'fake-notification-id-dsds',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
