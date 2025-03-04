import { CategoriesAndCoursesSection } from "@/components/pages/Home/sections/categories-home";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const HomePage = () => {
  return (
    <Fragment>
      <main className="w-full h-145 backgroundImg bg-no-repeat bg-cover bg-left">
        <div className="flex flex-col justify-center gap-6 align-middle py-38 px-42">
          <h1 className="text-3xl font-bold w-60">
            Build Skills with Online Course
          </h1>

          <p className="font-light text-base w-5/12">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </p>

          <Link
            href={"/"}
            className="bg-orange-400 w-32 text-white p-2 rounded-full hover:scale-110 duration-300"
          >
            Posts Comment
          </Link>
        </div>
      </main>
      <CategoriesAndCoursesSection />
      <div className="w-full flex flex-col gap-6 py-10 justify-center items-center px-42">
        <Image
          src={"/BANNER (1).svg"}
          alt="banner"
          width={350}
          height={340}
          className="w-full"
        />
        <Image
          src={"/Frame 51.svg"}
          alt="banner"
          width={350}
          height={340}
          className="w-full"
        />
        <Image
          src={"/Frame 55.svg"}
          alt="banner"
          width={350}
          height={340}
          className="w-full"
        />
        <Image
          src={"/BANNER.svg"}
          alt="banner"
          width={350}
          height={340}
          className="w-full"
        />
      </div>
    </Fragment>
  );
};

export default HomePage;
