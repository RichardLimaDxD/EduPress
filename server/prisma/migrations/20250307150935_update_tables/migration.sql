/*
  Warnings:

  - You are about to drop the column `image` on the `videos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "image";
