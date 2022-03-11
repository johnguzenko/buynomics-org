import { IntermediaryValidatorModule } from './intermediary-type-validator/intermediary-validator.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IntermediaryController } from './intermediary.controller';
import { IntermediaryService } from './intermediary.service';

@Module({
  imports: [PrismaModule, IntermediaryValidatorModule],
  controllers: [IntermediaryController],
  providers: [IntermediaryService],
})
export class IntermediaryModule {}
