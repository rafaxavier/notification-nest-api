import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('it should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('nova solicitação de amizade'),
      category: 'social',
      recipientId: 'algum-id-para-teste',
    });

    expect(notification).toBeTruthy();
  });
  //   test('it should not be able to create a notification content with less than 5 characters', () => {
  //     expect(() => new Content('voc')).toThrow();
  //   });

  //   test('it should not be able to create a notification content with more than 240 characters', () => {
  //     expect(() => new Content('a'.repeat(241))).toThrow();
  //   });
});
