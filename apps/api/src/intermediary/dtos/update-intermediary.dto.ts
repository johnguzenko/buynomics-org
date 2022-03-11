import { IntermediaryInfo } from './../models/intermediary-info';
import { IsInt, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIntermediaryDto {
  @ApiProperty({
    type: Number,
    example: '1',
    description: 'Id of intermediary',
  })
  @IsInt()
  readonly id: number;

  @ApiProperty({
    type: String,
    example: 'Distributor: US Foods',
    description: 'Name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: Number,
    example: '1',
    description: 'Order of intermediary in the list (integer only)',
  })
  @IsInt()
  readonly order: number;

  @ApiProperty({
    type: Object,
    description: 'Type of an intermediary',
  })
  @IsObject()
  readonly typeInfo: IntermediaryInfo;
}
