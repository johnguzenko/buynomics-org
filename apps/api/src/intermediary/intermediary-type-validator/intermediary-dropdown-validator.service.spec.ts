import { Test, TestingModule } from '@nestjs/testing';
import { IntermediaryDropdownValidatorService } from './intermediary-dropdown-validator.service';

describe('IntermediaryDropdownValidatorService', () => {
  let service: IntermediaryDropdownValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntermediaryDropdownValidatorService],
    }).compile();

    service = module.get<IntermediaryDropdownValidatorService>(
      IntermediaryDropdownValidatorService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
