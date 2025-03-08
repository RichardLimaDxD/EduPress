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
import { RequestVideoProps, VideoProps } from "@/interfaces/videos.interface";

const CoursesContext = createContext({} as CoursesContextProps);

const CoursesProviders = ({ children }: Children) => {
  const [courses, setCourses] = useState<CourseSProps[] | []>([]);
  const [purchased, setPurchased] = useState<MyCourseProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentVideo, setCurrentVideo] = useState<VideoProps>(
    {} as VideoProps
  );
  const [videoId, setVideoId] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const cookies = parseCookies();

  const { retrieveToken } = useUsers();

  let token: string = cookies["token"];

  useEffect(() => {
    getAll();

    if (!token) return;

    getAllPurchased();
  }, [cookies["token"]]);

  const uploadCourse = async (id: string, image: File) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies["token"]}`,
      },
    };

    const fd = new FormData();
    if (image.name.includes("png") || image.name.includes("webp")) {
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

  const createCourse = async (formData: RequestCoursesProps) => {
    try {
      setIsLoading(true);

      const response = await api.post("/courses", formData, {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      });

      setTimeout(async () => {
        setCourseId(response.data.id);
        await uploadCourse(response.data.id, imageFile!);
        await getAll();
        setIsLoading(false);
      }, 6000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error");
    }
  };

  const uploadVideo = async (id: string, video: File) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies["token"]}`,
      },
    };

    const fd = new FormData();
    if (video.name.includes("mp4")) {
      fd.append("video_url", video);

      const status = await api
        .patch(`/videos/${id}`, fd, config)
        .then((res) => {
          return res.status;
        });
      toast.success("Success.");
      return { status, id };
    }
    toast.error("Error.");
    return { status: 400, id };
  };

  const createVideo = async (formData: RequestVideoProps) => {
    try {
      setIsLoading(true);
      const response = await api.post("/videos", formData);

      setTimeout(async () => {
        await uploadVideo(response.data.id, videoFile!);
        await getAllPurchased();
        setIsLoading(false);
      }, 6000);
    } catch (error) {
      setIsLoading(false);
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
        createCourse,
        getAll,
        search,
        setSearch,
        addCourse,
        getAllPurchased,
        purchased,
        setVideoFile,
        setImageFile,
        createVideo,
        currentVideo,
        setCurrentVideo,
        videoId,
        setVideoId,
        courseId,
        isLoading,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesContext, CoursesProviders };
