import {
  buyCourseSchema,
  requestBuyCourseSchema,
} from "@/schemas/buy-course.schema";
import { z } from "zod";

type buyCourseProps = z.infer<typeof buyCourseSchema>;

type requestBuyCourseProps = z.infer<typeof requestBuyCourseSchema>;

interface MyCourseProps {
  id: string;
  userId: string;
  courseId: string;
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    video_url: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    categoryId: string;
  };
}

export type { buyCourseProps, requestBuyCourseProps, MyCourseProps };
