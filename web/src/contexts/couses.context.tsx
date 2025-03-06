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
import { useUsers } from "@/hooks/users.hook";

const CoursesContext = createContext({} as CoursesContextProps);

const CoursesProviders = ({ children }: Children) => {
  const [courses, setCourses] = useState<CourseSProps[] | []>([]);
  const [purchased, setPurchased] = useState<MyCourseProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const cookies = parseCookies();

  const { retrieveToken } = useUsers();

  let token: string = cookies["token"];

  useEffect(() => {
    getAll();

    if (!token) return;

    getAllPurchased();
  }, [cookies["token"]]);

  console.log(cookies["token"], "token");

  const upload = async (id: string, video_url: File, image: File) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies["token"]}`,
      },
    };

    const fd = new FormData();
    if (video_url.name.includes("mp4")) {
      fd.append("video_url", video_url);
      fd.append("image", image);

      const status = await api
        .patch(`/courses/upload/${id}`, fd, config)
        .then((res) => {
          return res.status;
        });
      toast.success("Success.");
      return { status, id };
    }
    toast.error("Error.");
    return { status: 400, id };
  };

  const create = async (formData: RequestCoursesProps) => {
    try {
      const response = await api.post("/courses", formData, {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      });

      setTimeout(async () => {
        await upload(response.data.id, videoFile!, imageFile!);
        await getAll();
      }, 6000);
    } catch (error) {
      toast.error("Error");
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
      console.log("reeee", retrieveToken);

      await api.post("/buy-course", formData, {
        headers: {
          Authorization: `Bearer ${retrieveToken}`,
        },
      });

      toast.success("Payment successfully!");
      getAllPurchased();
      router.push("/my-courses");
    } catch (error) {
      toast.success("Payment error!");
    }
  };

  const getAllPurchased = async () => {
    try {
      const response = await api.get(`/buy-course`, {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
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
        setVideoFile,
        setImageFile,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesContext, CoursesProviders };
