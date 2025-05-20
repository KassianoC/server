import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Ajuste o caminho conforme necessário

@Entity()
export class Personalizations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  book_id: number;

  @Column()
  person_name: string;

  @Column({ type: 'enum', enum: ['pt', 'en'] })
  language: 'pt' | 'en';

  @Column()
  age: number;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  gender: 'Male' | 'Female';

  @Column({ nullable: true })
  photo_url: string;

  @Column({ nullable: true })
  preview_url: string;

  @Column({ nullable: true })
  file_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relacionamento com User (opcional, se já tiver a entidade User)
  @ManyToOne(() => User, user => user.personalizations)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
