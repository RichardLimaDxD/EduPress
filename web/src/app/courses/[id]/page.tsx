import {
  CourseByIdPageprops,
  CourseSProps,
} from "@/interfaces/courses.interface";
import { notFound } from "next/navigation";
import api from "@/service/api";
import { CategoriesProps } from "@/interfaces/categories.interface";
import { Clock } from "lucide-react";
import FormattedDate from "@/utils/formatedDate";
import Image from "next/image";
import Link from "next/link";
import CourseDetails from "@/components/pages/courses/section/course-detail";

const CourseByIdPage = async ({ params }: CourseByIdPageprops) => {
  const { id } = await params;

  const responseCourse = await api.get<CourseSProps>(`courses/${id}`);

  const courseData: CourseSProps = responseCourse.data;

  if (!courseData) return notFound();

  const categoryId: string = courseData.categoryId;

  const responseCategory = await api.get<CategoriesProps>(
    `/categories/${categoryId}`
  );

  const categoryData: CategoriesProps = responseCategory.data;

  return (
    <main>
      <section className="w-full bg-black">
        <div className="w-full flex flex-row justify-between gap-6 py-16 px-42">
          <div className="flex flex-col gap-4">
            <span className="w-35 text-center p-2 rounded-sm bg-[#555555] text-white font-bold text-base">
              {categoryData.name}
            </span>
            <h1 className="text-white font-bold text-2xl">
              {courseData.title}
            </h1>

            <div className="flex flex-row gap-3 items-center ">
              <Clock size={16} color="orange" />
              <FormattedDate
                className="text-white"
                createdAt={String(courseData.createdAt)}
              />
            </div>
          </div>
          <div className="bg-white border-1 rounded-2xl absolute right-42 top-28">
            <Image
              src={
                courseData.image ? courseData.image : "/Rectangle 139 (1).svg"
              }
              alt="course image"
              width={350}
              height={140}
              className="rounded-2xl"
            />
            <div className="flex flex-row justify-between items-center p-4 px-9">
              <div className="flex flex-row gap-2">
                {courseData.price > 0 && (
                  <p className="line-through text-base text-gray-600 opacity-50">{`$${
                    courseData.price + 10
                  }`}</p>
                )}
                <p className="text-base text-red-500 font-bold">
                  {courseData.price === 0 ? "Free" : `$${courseData.price}`}
                </p>
              </div>
              <Link
                href={`/courses/${courseData.id}/payment?courseId=${courseData.id}&price=${courseData.price}`}
                className="bg-orange-400 text-white rounded-full p-2 px-4 hover:bg-orange-500 duration-300"
              >
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-6 py-28">
        <CourseDetails courseData={courseData} />
      </div>
    </main>
  );
};

export default CourseByIdPage;
