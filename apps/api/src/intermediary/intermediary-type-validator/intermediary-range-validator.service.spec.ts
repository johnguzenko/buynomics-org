import { Test, TestingModule } from '@nestjs/testing';
import { IntermediaryRangeValidatorService } from './intermediary-range-validator.service';

describe('IntermediaryRangeValidatorService', () => {
  let service: IntermediaryRangeValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntermediaryRangeValidatorService],
    }).compile();

    service = module.get<IntermediaryRangeValidatorService>(
      IntermediaryRangeValidatorService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
