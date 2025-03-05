import { VideoPlayer } from "@/components/pages/my-courses/purchased/video-player";
import { MyCourseProps } from "@/interfaces/buy-course.interface";
import { CourseByIdPageprops } from "@/interfaces/courses.interface";
import api from "@/service/api";
import { notFound } from "next/navigation";

const MypurchasedCourses = async ({ params }: CourseByIdPageprops) => {
  const { id } = await params;

  const { data } = await api.get<MyCourseProps>(`/buy-course/${id}`);

  if (!data) return notFound();

  return <VideoPlayer data={data} />;
};

export default MypurchasedCourses;
