import { Module } from '@nestjs/common';
import { IntermediaryTypeValidatorService } from './intermediary-type-validator.service';
import { IntermediaryDropdownValidatorService } from './intermediary-dropdown-validator.service';
import { IntermediaryRangeValidatorService } from './intermediary-range-validator.service';

@Module({
  providers: [
    IntermediaryTypeValidatorService,
    IntermediaryDropdownValidatorService,
    IntermediaryRangeValidatorService,
  ],
  //TODO: to do code more abstract we can use tokens and export interface
  exports: [IntermediaryTypeValidatorService],
})
export class IntermediaryValidatorModule {}
