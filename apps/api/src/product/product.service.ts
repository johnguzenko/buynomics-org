import { RangeTypeInfo } from './../intermediary/models/range-type-info';
import { DropdownTypeInfo } from './../intermediary/models/dropdown-type-info';
import { Intermediary } from '@prisma/client';
import { ProductCostCalculatorService } from './product-cost-calculator.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productCostCalculatorService: ProductCostCalculatorService
  ) {}

  async getAll() {
    const products = await this.prismaService.product.findMany({
      include: {
        productToIntermediary: {
          select: {
            intermediary: {
              select: { name: true, type: true, typeInfo: true, id: true },
            },
            value: true,
          },
        },
      },
    });

    //TODO cache it with distributed cache
    return products.map((product) => {
      return {
        ...product,
        endCost: this.productCostCalculatorService.calculate(
          product.cost,
          product.productToIntermediary.map(({ value }) => value)
        ),
      };
    });
  }

  async create(body: CreateProductDto): Promise<void> {
    const intermediaryMap = new Map<number, number>();
    const intermediaryIds = body.values.map(([id, value]) => {
      intermediaryMap.set(id, value);
      return id;
    });

    const allIntermediariesCount =
      await this.prismaService.intermediary.count();
    const selectedIntermediaries =
      await this.prismaService.intermediary.findMany({
        where: {
          id: { in: intermediaryIds },
        },
      });

    selectedIntermediaries.forEach((itermediary) => {
      this.validateIntermediaryValue(
        intermediaryMap.get(itermediary.id),
        itermediary
      );
    });

    if (allIntermediariesCount !== selectedIntermediaries.length) {
      throw new BadRequestException('Invalid intermediaries ids');
    }

    await this.prismaService.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: {
          name: body.name,
          cost: body.cost,
        },
      });

      await prisma.productToIntermediary.createMany({
        data: body.values.map(([id, value]) => ({
          intermediaryId: id,
          productId: product.id,
          value,
        })),
      });
    });
  }

  async update(body: UpdateProductDto): Promise<void> {
    const intermediaryMap = new Map<number, number>();
    const intermediaryIds = body.values.map(([id, value]) => {
      intermediaryMap.set(id, value);
      return id;
    });

    const allIntermediariesCount =
      await this.prismaService.intermediary.count();
    const selectedIntermediaries =
      await this.prismaService.intermediary.findMany({
        where: {
          id: { in: intermediaryIds },
        },
      });

    if (
      allIntermediariesCount !== selectedIntermediaries.length ||
      allIntermediariesCount !== body.values.length
    ) {
      throw new BadRequestException('Invalid intermediaries ids');
    }

    selectedIntermediaries.forEach((itermediary) => {
      this.validateIntermediaryValue(
        intermediaryMap.get(itermediary.id),
        itermediary
      );
    });

    await this.prismaService.$transaction(async (prisma) => {
      const product = await prisma.product.update({
        where: { id: body.id },
        data: {
          name: body.name,
          cost: body.cost,
        },
      });

      await Promise.all(
        body.values.map(([id, value]) =>
          prisma.productToIntermediary.update({
            where: {
              productId_intermediaryId: {
                intermediaryId: id,
                productId: product.id,
              },
            },
            data: {
              value,
            },
          })
        )
      );
    });
  }

  async delete(id: number): Promise<void> {
    const intermediary = await this.prismaService.product.findFirst({
      where: { id },
    });
    if (!intermediary) {
      throw new NotFoundException(`Product not found ${id}`);
    }
    await this.prismaService.product.delete({ where: { id } });
  }

  //TODO: of course we need to move this code to a separated module like here apps/api/src/intermediary/intermediary-type-validator
  private validateIntermediaryValue(value: number, intermediary: Intermediary) {
    if (intermediary.type === 'Dropdown') {
      if (
        !(intermediary.typeInfo as unknown as DropdownTypeInfo).options.some(
          (option) => option.value === value
        )
      ) {
        throw new BadRequestException('Option with such a value doesnt exist');
      }
      return;
    }

    if (intermediary.type === 'Range') {
      const typeInfo = intermediary.typeInfo as unknown as RangeTypeInfo;

      if (value < typeInfo.from) {
        throw new BadRequestException(`value cannot be less then from`);
      }

      if (value > typeInfo.to) {
        throw new BadRequestException('value cannot be more then to');
      }

      const diff =
        Math.round(value * 1000000 - typeInfo.from * 1000000) / 1000000;

      if (diff % typeInfo.step !== 0) {
        throw new BadRequestException(
          'Invalid value, step prevents to input this value'
        );
      }
    }
  }
}
