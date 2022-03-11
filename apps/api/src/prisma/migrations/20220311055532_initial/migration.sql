-- CreateEnum
CREATE TYPE "IntermediaryType" AS ENUM ('Range', 'Dropdown');

-- CreateTable
CREATE TABLE "Intermediary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "IntermediaryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeInfo" JSONB NOT NULL,

    CONSTRAINT "Intermediary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductToIntermediary" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "intermediaryId" INTEGER NOT NULL,
    "intermediaryTypeSnapshot" JSONB NOT NULL,

    CONSTRAINT "ProductToIntermediary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductToIntermediary" ADD CONSTRAINT "ProductToIntermediary_intermediaryId_fkey" FOREIGN KEY ("intermediaryId") REFERENCES "Intermediary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToIntermediary" ADD CONSTRAINT "ProductToIntermediary_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
