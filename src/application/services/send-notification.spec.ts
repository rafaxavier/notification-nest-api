import { SendNotification } from './send-notification';

describe('Send notification', () => {
  test('should be able to send notification', () => {
    const sendNotification = new SendNotification();

    const notificationResponse = sendNotification.execute({
      recipientId: 'teste-recipient-id',
      content: 'conteudo qualquerdskjdksjkdsjksj',
      category: 'categoria qualquer',
    });

    expect(notificationResponse).toBeTruthy();
  });
});
