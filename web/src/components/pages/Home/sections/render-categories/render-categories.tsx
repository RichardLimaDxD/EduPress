"use client";

import { useCategories } from "@/hooks/categories.hook";
import Image from "next/image";
import Link from "next/link";

const RenderCategoriesHome = () => {
  const { categories } = useCategories();

  return (
    <ul className="grid grid-cols-5 gap-5 mt-12 mb-4">
      {categories.map((category) => (
        <Link key={category.id} href={"/courses"}>
          <li
            key={category.id}
            className="flex flex-col h-55 gap-4 justify-center items-center border-1 p-4 rounded-3xl cursor-pointer transition-transform hover:shadow-2xl hover:-translate-y-4 duration-300"
          >
            <Image
              src={"/Icon.svg"}
              alt="icon"
              width={22}
              height={20}
              color="orange"
            />
            <h2 className="text-base font-bold">{category.name}</h2>
            <span className="text-sm text-gray-600">
              {category._count.course} Courses
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export { RenderCategoriesHome };
