import { Module } from '@nestjs/common';
import { IntermediaryModule } from './intermediary/intermediary.module';
import { ProductModule } from './product/product.module';

@Module({
  //TODO move these modules to libs, to increase modularity and testing in ci pipeline
  imports: [IntermediaryModule, ProductModule],
})
export class AppModule {}
