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
    createdAt: string;
    updatedAt: string;
    userId: string;
    categoryId: string;
    image: string | null;
    videos: {
      id: string;
      title: string;
      video_url: string | null;
      courseId: string;
    }[];
  };
}

export type { buyCourseProps, requestBuyCourseProps, MyCourseProps };
