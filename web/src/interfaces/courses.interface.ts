import { coursesSchema, requestCourseSchema } from "@/schemas/courses.schema";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { MyCourseProps, requestBuyCourseProps } from "./buy-course.interface";

interface CoursesContextProps {
  create: (formData: RequestCoursesProps) => Promise<void>;
  courses: CourseSProps[] | [];
  getAll: () => Promise<void>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  addCourse: (formData: requestBuyCourseProps) => Promise<void>;
  purchased: MyCourseProps[];
  getAllPurchased: () => Promise<void>;
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
