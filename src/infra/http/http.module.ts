import { Module } from '@nestjs/common';
import { SendNotification } from '@application/services/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/services/cancel-notification';
import { CountRecipientNotification } from '@application/services/count-recipient-notification';
import { GetRecipientNotification } from '@application/services/get-recipient-notification';
import { ReadNotification } from '@application/services/read-notification';
import { UnreadNotification } from '@application/services/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
