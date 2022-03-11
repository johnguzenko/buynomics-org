import { Test, TestingModule } from '@nestjs/testing';
import { IntermediaryTypeValidatorService } from './intermediary-type-validator.service';

describe('IntermediaryTypeValidatorService', () => {
  let service: IntermediaryTypeValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntermediaryTypeValidatorService],
    }).compile();

    service = module.get<IntermediaryTypeValidatorService>(
      IntermediaryTypeValidatorService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
