import { coursesSchema, requestCourseSchema } from "@/schemas/courses.schema";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { MyCourseProps, requestBuyCourseProps } from "./buy-course.interface";
import { RequestVideoProps, VideoProps } from "./videos.interface";

interface CoursesContextProps {
  courses: CourseSProps[];
  createCourse: (formData: RequestCoursesProps) => Promise<void>;
  getAll: () => Promise<void>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  addCourse: (formData: requestBuyCourseProps) => Promise<void>;
  purchased: MyCourseProps[];
  getAllPurchased: () => Promise<void>;
  createVideo: (formData: RequestVideoProps) => Promise<void>;
  setVideoFile: Dispatch<SetStateAction<File | null>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  currentVideo: VideoProps;
  setCurrentVideo: Dispatch<SetStateAction<VideoProps>>;
  videoId: string;
  setVideoId: Dispatch<SetStateAction<string>>;
  courseId: string;
  isLoading: boolean;
}

interface CourseByIdPageprops {
  params: Promise<{ id: string }>;
}

type CourseSProps = z.infer<typeof coursesSchema>;

type RequestCoursesProps = z.infer<typeof requestCourseSchema>;

export type {
  CoursesContextProps,
  CourseSProps,
  RequestCoursesProps,
  CourseByIdPageprops,
};
