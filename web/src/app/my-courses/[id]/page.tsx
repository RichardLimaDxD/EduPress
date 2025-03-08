import { VideoPlayer } from "@/components/pages/my-courses/purchased/video-player";
import { CourseByIdPageprops } from "@/interfaces/courses.interface";
import { VideoProps } from "@/interfaces/videos.interface";
import api from "@/service/api";
import { notFound } from "next/navigation";

const MypurchasedCourses = async ({
  params,
  searchParams,
}: CourseByIdPageprops & { searchParams: { videoId?: string } }) => {
  const { id } = await params;

  const { videoId } = await searchParams;

  const response = await api.get<VideoProps>(`/videos/all/${id}`);

  const responseById = await api.get<VideoProps>(`/videos/${videoId}`);

  const data: any = response.data;

  const dataById = responseById.data;

  if (!data) return notFound();

  return <VideoPlayer data={data} dataById={dataById} />;
};

export default MypurchasedCourses;
