import { Language } from '../../../common/enums/language.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  client_id: string | null;

  @Column({ type: 'boolean', default: false })
  product_type: boolean; // true para livros

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.EN,
    nullable: false,
  })
  language: Language;

  @Column({ type: 'varchar', length: 255, nullable: true })
  preview_url: string | null;

  @Column('json', { nullable: true })
  images: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_example: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover_image: string | null;

  @Column({ type: 'float', nullable: true })
  height: number | null;

  @Column({ type: 'float', nullable: true })
  width: number | null;

  @Column({ type: 'float', nullable: true })
  length: number | null;

  @Column({ type: 'float', nullable: true })
  weight: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  book_format: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bar_code: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
