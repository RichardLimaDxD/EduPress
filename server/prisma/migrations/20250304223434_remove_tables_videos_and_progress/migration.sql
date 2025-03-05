/*
  Warnings:

  - You are about to drop the `modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_video_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "user_video_progress" DROP CONSTRAINT "user_video_progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_video_progress" DROP CONSTRAINT "user_video_progress_videoId_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_moduleId_fkey";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "video_url" TEXT;

-- DropTable
DROP TABLE "modules";

-- DropTable
DROP TABLE "user_video_progress";

-- DropTable
DROP TABLE "videos";
