"use client";
import { CreateCoursePanel } from "@/components/pages/my-courses/createCoursePanel/create-course-panel";
import { MyCoursesRender } from "@/components/pages/my-courses/render/my-courses-render";
import { useCouses } from "@/hooks/courses.hook";
import { useUsers } from "@/hooks/users.hook";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

const MyCourses = () => {
  const { user } = useUsers();
  const { purchased, getAllPurchased } = useCouses();
  const cookies = parseCookies();

  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    if (cookies["token"]) {
      setIsTokenLoaded(true);
      getAllPurchased();
    }
  }, [cookies["token"]]);

  if (!isTokenLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full flex flex-row justify-between gap-6 py-12 px-42">
      <div>{user?.roles === "SELLER" ? <CreateCoursePanel /> : null}</div>
      <section>
        {purchased.length === 0 ? (
          <Image
            src={"/Frame-background.svg"}
            alt="background"
            width={100}
            height={100}
            className="w-full h-full"
          />
        ) : (
          <MyCoursesRender />
        )}
      </section>
    </main>
  );
};

export default MyCourses;
