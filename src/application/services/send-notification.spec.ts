import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repositories';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  test('should be able to send notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      recipientId: 'teste-recipient-id',
      content: 'conteudo qualquerdskjdksjkdsjksj',
      category: 'categoria qualquer',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
