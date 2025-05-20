import { IsString } from 'class-validator';

import { UpdateDateColumn } from 'typeorm';

export class putPasswordDto {
  @IsString()
  password: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
