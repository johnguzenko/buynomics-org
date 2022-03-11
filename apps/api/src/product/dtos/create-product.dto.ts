import {
  IsArray,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    example: 'Yogurt',
    description: 'Name of a product',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({
    type: Number,
    example: '1.00',
    description: 'Manufacturer Cost',
  })
  @IsNumber({ maxDecimalPlaces: 6 })
  readonly cost: number;

  @ApiProperty({
    type: Number,
    example: '[itermediaryId, value]',
    description: 'Selected value for every intermediary',
  })
  @IsArray()
  readonly values: ReadonlyArray<[number, number]>;
}
