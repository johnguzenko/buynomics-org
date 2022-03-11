import { IntermediaryInfo } from './models/intermediary-info';
import { UpdateIntermediaryDto } from './dtos/update-intermediary.dto';
import { IntermediaryInvalidError } from './intermediary-type-validator/errors/intermediary-invalid-error';
import { IntermediaryTypeValidatorService } from './intermediary-type-validator/intermediary-type-validator.service';
import { CreateIntermediaryDto } from './dtos/create-intermediary.dto';
import { Intermediary } from '@prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntermediaryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly intermediaryTypeValidatorService: IntermediaryTypeValidatorService
  ) {}

  create(body: CreateIntermediaryDto): Promise<Intermediary> {
    try {
      this.intermediaryTypeValidatorService.validateOnCreate(
        body.type,
        body.typeInfo
      );
    } catch (error: unknown) {
      if (error instanceof IntermediaryInvalidError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }

    return this.prismaService.intermediary.create({
      data: {
        name: body.name,
        order: body.order,
        type: body.type,
        typeInfo: body.typeInfo as object,
      },
    });
  }

  async update(body: UpdateIntermediaryDto): Promise<void> {
    try {
      const intermediary = await this.prismaService.intermediary.findFirst({
        where: {
          id: body.id,
        },
      });

      if (!intermediary) {
        throw new NotFoundException(`Intermediary not found: ${body.id}`);
      }

      this.intermediaryTypeValidatorService.validateOnEdit(
        intermediary.type,
        intermediary.typeInfo as unknown as IntermediaryInfo,
        body.typeInfo
      );

      await this.prismaService.intermediary.update({
        where: { id: intermediary.id },
        data: {
          name: body.name,
          order: body.order,
          typeInfo: body.typeInfo as object,
        },
      });
    } catch (error: unknown) {
      if (error instanceof IntermediaryInvalidError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    const intermediary = await this.prismaService.intermediary.findFirst({
      where: { id },
    });
    if (!intermediary) {
      throw new NotFoundException(`Intermediary not found ${id}`);
    }
    await this.prismaService.intermediary.delete({ where: { id } });
  }
}
