import { Module } from '@nestjs/common';
import { IntermediaryModule } from './intermediary/intermediary.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [IntermediaryModule, ProductModule],
})
export class AppModule {}
