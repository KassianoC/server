import { Module } from '@nestjs/common';
import { PersonalizationsService } from './personalizations.service';
import { PersonalizationsController } from './personalizations.controller';

@Module({
  controllers: [PersonalizationsController],
  providers: [PersonalizationsService],
})
export class PersonalizationsModule {}
