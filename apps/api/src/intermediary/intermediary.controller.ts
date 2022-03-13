import { UpdateIntermediaryDto } from './dtos/update-intermediary.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Intermediary } from '@prisma/client';
import { CreateIntermediaryDto } from './dtos/create-intermediary.dto';
import { IntermediaryService } from './intermediary.service';

//TODO: in all controllers we need to return the same dtos which our frontend uses
@ApiTags('intermediary')
@Controller('intermediary')
export class IntermediaryController {
  constructor(private readonly intermediaryService: IntermediaryService) {}

  @ApiOperation({
    summary: 'Get all intermediaries',
  })
  @Get()
  getAll(): Promise<Intermediary[]> {
    return this.intermediaryService.getAll();
  }

  @ApiOperation({
    summary: 'Create an intermediary',
  })
  @Post()
  create(@Body() body: CreateIntermediaryDto) {
    return this.intermediaryService.create(body);
  }

  @ApiOperation({
    summary: 'Update an intermediary',
  })
  @Put()
  update(@Body() body: UpdateIntermediaryDto) {
    return this.intermediaryService.update(body);
  }

  @ApiOperation({
    summary: 'Delete an intermediary',
  })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.intermediaryService.delete(id);
  }
}
