import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentStatus } from '../../../common/enums/payment-status.enum';
import { DeliveryStatus } from '../../../common/enums/delivery-status.enum';
import { CreateOrderItemDto } from '../../order-items/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  user_id: number;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
