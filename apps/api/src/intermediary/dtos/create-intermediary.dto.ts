import { IntermediaryInfo } from './../models/intermediary-info';
import { IsEnum, IsInt, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntermediaryType } from '@prisma/client';

export class CreateIntermediaryDto {
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
    type: IntermediaryType,
    enum: IntermediaryType,
    description: 'Type of an intermediary',
  })
  @IsEnum(IntermediaryType)
  readonly type: IntermediaryType;

  @ApiProperty({
    type: Object,
    description: 'Type of an intermediary',
  })
  @IsObject()
  readonly typeInfo: IntermediaryInfo;
}
