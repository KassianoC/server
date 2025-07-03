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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  client_id: string | null;

  @Column({ type: 'varchar', length: 50, default: 'default', nullable: false })
  product_type: string; // exemplo: 'livro', 'revista', etc.

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
  image_example: string | null; // Imagem principal

  @Column({ type: 'boolean', default: false, nullable: false })
  del: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover_image: string | null;

  @Column('simple-array', { nullable: true }) // Array para imagens de páginas
  page_images: string[];

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

  @Column({ type: 'int', nullable: true })
  pages: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bar_code: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
