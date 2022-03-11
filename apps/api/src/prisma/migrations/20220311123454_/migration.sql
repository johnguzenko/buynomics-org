/*
  Warnings:

  - The primary key for the `ProductToIntermediary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductToIntermediary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,intermediaryId]` on the table `ProductToIntermediary` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductToIntermediary" DROP CONSTRAINT "ProductToIntermediary_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "ProductToIntermediary_productId_intermediaryId_key" ON "ProductToIntermediary"("productId", "intermediaryId");
