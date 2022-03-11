import { Test, TestingModule } from '@nestjs/testing';
import { ProductCostCalculatorService } from './product-cost-calculator.service';

describe('ProductCostCalculatorService', () => {
  let service: ProductCostCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCostCalculatorService],
    }).compile();

    service = module.get<ProductCostCalculatorService>(
      ProductCostCalculatorService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
