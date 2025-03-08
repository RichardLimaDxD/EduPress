"use client";
import Image from "next/image";
import Link from "next/link";
import { Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCouses } from "@/hooks/courses.hook";

const MyCoursesRender = () => {
  const { purchased, search, setSearch } = useCouses();

  const filteredCourses = purchased.filter((course) =>
    course.course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container px-4 py-10 mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            My Learning Library
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Continue your learning journey with your purchased courses
          </p>
        </div>
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search courses..."
              className="pl-9 w-full md:w-[260px] bg-white dark:bg-slate-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            No courses found
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((purchase) => (
            <Card
              key={purchase.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <div className="relative aspect-video">
                <Image
                  src={purchase.course.image ?? "/Image-course.svg"}
                  alt={purchase.course.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Badge className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900/80 text-white">
                  {purchase.course.categoryId}
                </Badge>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    8h 45m
                  </span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Last viewed:
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold leading-tight text-slate-900 dark:text-slate-50 line-clamp-1">
                  {purchase.course.title}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      1% complete
                    </span>
                  </div>
                  <Progress value={1} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Link
                  href={`/my-courses/${purchase.courseId}?videoId=${purchase.course.videos[0].id}`}
                  className="w-full cursor-pointer
                "
                >
                  <Button className="w-full gap-2 cursor-pointer" size="lg">
                    <Play className="w-4 h-4" />
                    {1 > 0 ? "Continue Learning" : "Start Course"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export { MyCoursesRender };
