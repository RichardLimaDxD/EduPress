"use client";
import { useCouses } from "@/hooks/courses.hook";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import FormattedDate from "@/utils/formatedDate";

const RenderCoursesHome = () => {
  const { courses } = useCouses();

  return (
    <ul className="grid grid-cols-3 gap-12 mt-12 mb-4">
      {courses.map((course) => (
        <Link key={course.id} href={`courses/${course.id}`}>
          <li
            key={course.id}
            className="flex flex-col gap-4 border-1 rounded-3xl overflow-hidden pb-5 transition-transform hover:shadow-2xl hover:-translate-y-6 duration-300"
          >
            <Image
              src={course.image ? course.image : "/Image-course.svg"}
              alt="course image"
              width={450}
              height={340}
              className="rounded-3xl"
            />
            <div className="flex flex-col gap-2 px-4">
              <h2 className="text-base font-bold w-60">{course.title}</h2>
              <div className="flex flex-row gap-3 items-center ">
                <Clock size={16} color="orange" />
                <FormattedDate createdAt={String(course.createdAt)} />
              </div>
              <Separator />
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                  <p className="line-through text-base text-gray-600">{`$${
                    course.price + 10
                  }`}</p>
                  <p className="text-base text-green-500">{`$${course.price}`}</p>
                </div>
                <h3 className="text-base font-bold">View More</h3>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export { RenderCoursesHome };
