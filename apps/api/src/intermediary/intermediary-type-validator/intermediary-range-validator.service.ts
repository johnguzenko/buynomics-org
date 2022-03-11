import { IntermediaryInvalidError } from './errors/intermediary-invalid-error';
import { countDecimal } from '@buynomics-org/utils';
import { RangeTypeInfo } from './../models/range-type-info';
import { Injectable } from '@nestjs/common';
import { IIntermediaryTypeValidator } from './intermediary-type-validator';

@Injectable()
export class IntermediaryRangeValidatorService
  implements IIntermediaryTypeValidator<RangeTypeInfo>
{
  validateOnCreate(info: RangeTypeInfo): void {
    const { from, to, step } = info;

    if (isNaN(from) || countDecimal(from) > 6) {
      throw new IntermediaryInvalidError(
        'from should not have more than 6 digits after the decimal point'
      );
    }

    if (isNaN(to) || countDecimal(to) > 6) {
      throw new IntermediaryInvalidError(
        'to should not have more than 6 digits after the decimal point'
      );
    }

    if (isNaN(step) || countDecimal(step) > 6) {
      throw new IntermediaryInvalidError(
        'step should not have more than 6 digits after the decimal point'
      );
    }

    if (from > to) {
      throw new IntermediaryInvalidError('from should not be more than to');
    }

    if (step < 0) {
      throw new IntermediaryInvalidError('step should be positive number');
    }
  }

  validateOnEdit(previosInfo: RangeTypeInfo, newInfo: RangeTypeInfo): void {
    if (previosInfo.from < newInfo.from) {
      throw new IntermediaryInvalidError(
        'new from should not be more than current from value'
      );
    }

    const fromDiff =
      Math.round(previosInfo.from * 1000000 - newInfo.from * 1000000) / 1000000;

    if (fromDiff % newInfo.step !== 0) {
      throw new IntermediaryInvalidError('Invalid from');
    }
  }
}
