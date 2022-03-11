import { IntermediaryRangeValidatorService } from './intermediary-range-validator.service';
import { IntermediaryDropdownValidatorService } from './intermediary-dropdown-validator.service';
import { IntermediaryInfo } from './../models/intermediary-info';
import { IIntermediaryTypeValidator } from './intermediary-type-validator';
import { Injectable } from '@nestjs/common';
import { IntermediaryType } from '@prisma/client';

//TODO: improve validations and return information about errors
@Injectable()
export class IntermediaryTypeValidatorService {
  private readonly validadors = new Map<
    IntermediaryType,
    IIntermediaryTypeValidator<IntermediaryInfo>
  >()
    .set(IntermediaryType.Dropdown, this.intermediaryDropdownValidatorService)
    .set(IntermediaryType.Range, this.intermediaryRangeValidatorService);

  constructor(
    private readonly intermediaryDropdownValidatorService: IntermediaryDropdownValidatorService,
    private readonly intermediaryRangeValidatorService: IntermediaryRangeValidatorService
  ) {}

  validateOnCreate(type: IntermediaryType, info: IntermediaryInfo) {
    if (!this.validadors.has(type)) {
      throw new Error(`Unrecognized validator type: ${type}`);
    }

    this.validadors.get(type).validateOnCreate(info);
  }

  validateOnEdit(
    type: IntermediaryType,
    previosInfo: IntermediaryInfo,
    newInfo: IntermediaryInfo
  ) {
    if (!this.validadors.has(type)) {
      throw new Error(`Unrecognized validator type: ${type}`);
    }

    this.validadors.get(type).validateOnEdit(previosInfo, newInfo);
  }
}
