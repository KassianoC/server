import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationType } from '../../../common/enums/notification-type.enum';

export class CreateNotificationDto {
  @IsNotEmpty()
  user_id: number;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNotEmpty()
  @IsString()
  content: string;
}
