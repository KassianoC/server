import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentStatus } from '../../../common/enums/payment-status.enum';
import { DeliveryStatus } from '../../../common/enums/delivery-status.enum';
import { User } from '../../../modules/user/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'float' })
  total_amount: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  payment_status: PaymentStatus;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  delivery_status: DeliveryStatus;

  @Column({ nullable: true })
  tracking_code: string;

  @Column()
  address_line_1: string;

  @Column({ nullable: true })
  address_line_2: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state_code: string;

  @Column()
  country: string;

  @Column()
  postal_code: string;

  @Column({ nullable: true })
  graphic_company: string;

  @CreateDateColumn()
  created_at: Date;
}
