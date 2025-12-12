-- DropForeignKey
ALTER TABLE "public"."Note" DROP CONSTRAINT "Note_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Note" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
