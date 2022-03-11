import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCostCalculatorService {
  calculate(productCost: number, values: ReadonlyArray<number>): number {
    let cost = productCost;

    values.map((value) => {
      cost += productCost * value;
    });

    return cost;
  }
}
