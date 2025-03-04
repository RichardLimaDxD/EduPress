"use client";

import {
  CoursesContextProps,
  CourseSProps,
  RequestCoursesProps,
} from "@/interfaces/courses.interface";
import { Children } from "@/interfaces/children.interface";
import { createContext, useEffect, useState } from "react";
import api from "@/service/api";
import { toast } from "sonner";
import { parseCookies } from "nookies";

const CoursesContext = createContext({} as CoursesContextProps);

const CoursesProviders = ({ children }: Children) => {
  const [courses, setCourses] = useState<CourseSProps[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const cookies = parseCookies();
  const token = cookies["token"];

  useEffect(() => {
    getAll();
  }, [courses]);

  const create = async (formData: RequestCoursesProps) => {
    try {
      await api.post("/courses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Course created successfully.");
    } catch (error) {
      toast.error("Failed to create course.");
    }
  };

  const getAll = async (categoryIds: string[] = []) => {
    try {
      const response = await api.get("/courses", {
        params: {
          categories: categoryIds.join(","),
        },
      });

      const { data } = response;

      setCourses(data);
    } catch (error) {}
  };

  return (
    <CoursesContext.Provider
      value={{ courses, create, getAll, search, setSearch }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesContext, CoursesProviders };
