import { coursesSchema, requestCourseSchema } from "@/schemas/courses.schema";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

interface CoursesContextProps {
  create: (formData: RequestCoursesProps) => Promise<void>;
  courses: CourseSProps[] | [];
  getAll: () => Promise<void>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
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
