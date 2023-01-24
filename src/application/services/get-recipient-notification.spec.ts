import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { GetRecipientNotification } from './get-recipient-notification';

describe('Count recipients notifications', () => {
  test('should be able to count recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
      ]),
    );
  });
});
