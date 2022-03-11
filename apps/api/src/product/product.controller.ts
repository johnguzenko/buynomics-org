import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Body,
  Post,
  Get,
  ParseIntPipe,
  Delete,
  Param,
  Put,
} from '@nestjs/common';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get list of products',
  })
  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @ApiOperation({
    summary: 'Create a product',
  })
  @Post()
  create(@Body() body: CreateProductDto): Promise<void> {
    return this.productService.create(body);
  }

  @ApiOperation({
    summary: 'Update a product',
  })
  @Put()
  update(@Body() body: UpdateProductDto): Promise<void> {
    return this.productService.update(body);
  }

  @ApiOperation({
    summary: 'Delete an intermediary',
  })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
