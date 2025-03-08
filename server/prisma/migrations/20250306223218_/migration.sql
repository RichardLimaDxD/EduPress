/*
  Warnings:

  - You are about to drop the column `image` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "image",
DROP COLUMN "video_url";

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "video_url" TEXT,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
