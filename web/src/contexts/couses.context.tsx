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
import {
  MyCourseProps,
  requestBuyCourseProps,
} from "@/interfaces/buy-course.interface";
import { useRouter } from "next/navigation";

const CoursesContext = createContext({} as CoursesContextProps);

const CoursesProviders = ({ children }: Children) => {
  const [courses, setCourses] = useState<CourseSProps[] | []>([]);
  const [purchased, setPurchased] = useState<MyCourseProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies["token"];

  useEffect(() => {
    getAll();
    getAllPurchased();
  }, []);

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

  const addCourse = async (formData: requestBuyCourseProps) => {
    try {
      await api.post("/buy-course", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Payment successfully!");
      router.push("/my-courses");
    } catch (error) {
      toast.success("Payment error!");
    }
  };

  const getAllPurchased = async () => {
    try {
      const response = await api.get(`/buy-course`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPurchased(response.data);
    } catch (error) {}
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        create,
        getAll,
        search,
        setSearch,
        addCourse,
        getAllPurchased,
        purchased,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesContext, CoursesProviders };
