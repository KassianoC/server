import { Language } from 'src/common/enums/language.enum';
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
  client_id: string;

  @Column({ type: 'boolean', default: false })
  product_type: boolean; // true para livros

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Language, default: Language.EN })
  language: Language;

  @Column({ nullable: true })
  preview_url: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({ nullable: true })
  image_example: string;

  @Column({ nullable: true })
  cover_image: string;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  width: number;

  @Column({ type: 'float', nullable: true })
  length: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ nullable: true })
  book_format: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ nullable: true })
  bar_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
