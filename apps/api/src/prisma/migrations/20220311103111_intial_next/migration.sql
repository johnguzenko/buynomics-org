-- DropForeignKey
ALTER TABLE "ProductToIntermediary" DROP CONSTRAINT "ProductToIntermediary_intermediaryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductToIntermediary" DROP CONSTRAINT "ProductToIntermediary_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductToIntermediary" ADD CONSTRAINT "ProductToIntermediary_intermediaryId_fkey" FOREIGN KEY ("intermediaryId") REFERENCES "Intermediary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToIntermediary" ADD CONSTRAINT "ProductToIntermediary_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
