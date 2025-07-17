import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Ajuste o caminho conforme necessário
import {
  IsString,
  Length,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Product } from '../../products/entities/product.entity';

@Entity()
@Index(['user_id'])
@Index(['book_id']) // Índice para book_id (que referencia Product)
export class Personalizations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  user_id?: number | null;

  @Column()
  @IsInt()
  book_id: number; // Chave estrangeira para a entidade Product

  @Column()
  @IsString()
  @Length(1, 100)
  person_name: string;

  @Column({ type: 'enum', enum: ['pt', 'en'] })
  @IsEnum(['pt', 'en'])
  language: 'pt' | 'en';

  @Column()
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  @IsEnum(['Male', 'Female'])
  gender: 'Male' | 'Female';

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  photo: string; // Armazena o nome/caminho do arquivo (e.g., 'foto123.jpg')

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relacionamento com User
  @ManyToOne(() => User, user => user.personalizations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relacionamento com Product
  @ManyToOne(() => Product, book => book.personalizations)
  @JoinColumn({ name: 'book_id' })
  book: Product;
}
