import { CategoriesHome } from "@/components/pages/Home/sections/categories-home";
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
      <CategoriesHome />
    </Fragment>
  );
};

export default HomePage;
