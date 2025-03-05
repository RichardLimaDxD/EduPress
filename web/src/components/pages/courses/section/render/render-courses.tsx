"use client";

import { Separator } from "@/components/ui/separator";
import { useCouses } from "@/hooks/courses.hook";
import FormattedDate from "@/utils/formatedDate";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RenderCourses = ({ selectedCategories }: any) => {
  const { courses, search } = useCouses();

  const filtered = courses.filter((course) => {
    const matchesSearch =
      search === "" ||
      course.title.toLocaleLowerCase().includes(search.toLowerCase()) ||
      course.price
        .toString()
        .toLocaleLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.categoryId);

    return matchesSearch && matchesCategory;
  });

  return (
    <ul className="flex flex-col gap-6 mt-10 ">
      {filtered.map((course) => (
        <Link key={course.id} href={`courses/${course.id}`}>
          <li
            key={course.id}
            className="flex flex-row gap-4 border-1 rounded-3xl transition-transform hover:shadow-2xl hover:-translate-y-1 duration-300"
          >
            <Image
              src={course.image ? course.image : "/Rectangle 139.svg"}
              alt="course image"
              width={450}
              height={340}
              className="rounded-3xl min-w-60"
            />
            <div className="w-full flex flex-col p-3 justify-evenly gap-2 px-5">
              <div className="flex flex-col gap-2 mt-12">
                <h2 className="text-base font-bold">{course.title}</h2>
                <div className="flex flex-row gap-3 items-center ">
                  <Clock size={16} color="orange" />
                  <FormattedDate createdAt={String(course.createdAt)} />
                </div>
              </div>
              <Separator className="w-full" />
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

export { RenderCourses };
