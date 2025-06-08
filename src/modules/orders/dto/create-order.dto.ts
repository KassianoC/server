import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaymentStatus } from '../../../common/enums/payment-status.enum';
import { DeliveryStatus } from '../../../common/enums/delivery-status.enum';

export class CreateOrderDto {
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;

  @IsEnum(DeliveryStatus)
  delivery_status: DeliveryStatus;

  @IsOptional()
  @IsString()
  tracking_code?: string;

  @IsNotEmpty()
  @IsString()
  address_line_1: string;

  @IsOptional()
  @IsString()
  address_line_2?: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state_code: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @IsOptional()
  @IsString()
  graphic_company?: string;
}
