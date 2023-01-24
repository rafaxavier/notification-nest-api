import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipients notifications', () => {
  test('should be able to count recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'example-recipient-id-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'example-recipient-id-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'example-recipient-id-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
