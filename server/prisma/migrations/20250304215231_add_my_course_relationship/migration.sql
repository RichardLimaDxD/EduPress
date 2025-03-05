-- CreateTable
CREATE TABLE "my_courses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "my_courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "my_courses" ADD CONSTRAINT "my_courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "my_courses" ADD CONSTRAINT "my_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
