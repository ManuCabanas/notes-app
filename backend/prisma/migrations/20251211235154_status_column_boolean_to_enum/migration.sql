/*
  Warnings:

  - You are about to drop the column `archived` on the `Note` table. All the data in the column will be lost.
  - Added the required column `status` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."NoteStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."Note" DROP COLUMN "archived",
ADD COLUMN     "status" "public"."NoteStatus" NOT NULL;
