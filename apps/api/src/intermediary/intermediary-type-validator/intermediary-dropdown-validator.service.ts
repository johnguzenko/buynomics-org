import { IntermediaryInvalidError } from './errors/intermediary-invalid-error';
import { IIntermediaryTypeValidator } from './intermediary-type-validator';
import { Injectable } from '@nestjs/common';
import { DropdownTypeInfo } from '../models/dropdown-type-info';
import { countDecimal } from '@buynomics-org/utils';

@Injectable()
export class IntermediaryDropdownValidatorService
  implements IIntermediaryTypeValidator<DropdownTypeInfo>
{
  validateOnCreate(info: DropdownTypeInfo): void {
    this.validate(info);
  }
  validateOnEdit(
    previosInfo: DropdownTypeInfo,
    newInfo: DropdownTypeInfo
  ): void {
    this.validate(newInfo);
  }

  private validate(info: DropdownTypeInfo) {
    if (!info.options || info.options.length === 0) {
      throw new IntermediaryInvalidError('Options cannot be empty');
    }

    const isInvalid = info.options.some((option) => {
      if (option.option?.length < 0) {
        return true;
      }

      if (isNaN(option.value) || countDecimal(option.value) > 6) {
        return true;
      }

      return false;
    });

    if (isInvalid) {
      throw new IntermediaryInvalidError('Options invalid');
    }
  }
}
