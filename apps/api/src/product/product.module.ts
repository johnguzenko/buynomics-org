import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductCostCalculatorService } from './product-cost-calculator.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductCostCalculatorService],
})
export class ProductModule {}
