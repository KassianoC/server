import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Language } from '../../../common/enums/language.enum';
import { User } from '../../../modules/user/entities/user.entity';
import { Order } from '../../../modules/orders/entities/order.entity';
import { Personalizations } from '../../../modules/personalizations/entities/personalization.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  order_id: string;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ nullable: true })
  personalization_id: number;

  @ManyToOne(() => Personalizations, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'personalization_id' })
  personalization: Personalizations;

  @Column()
  book_title: string;

  @Column({ type: 'enum', enum: Language, default: Language.EN })
  language: Language;

  @Column({ nullable: true })
  preview_url: string;

  @Column('json', { nullable: true })
  images: string[];

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'float' })
  price: number;

  @CreateDateColumn()
  created_at: Date;
}
