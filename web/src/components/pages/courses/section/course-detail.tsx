"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Star, User } from "lucide-react";

interface CourseSProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
}

interface UsersProps {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    roles: string;
  };
}

interface MyCourseProps {
  id: string;
  userId: string;
  courseId: string;
}

interface VideoProps {
  id: string;
  title: string;
  video_url: string;
  courseId: string;
}

interface CourseProps extends CourseSProps, UsersProps {
  myCourses: MyCourseProps[];
  videos: VideoProps[];
}

export default function CourseDetails({
  courseData,
}: {
  courseData: CourseProps;
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className=" py-12 px-42 p-4 ">
      <Card className="overflow-hidden border shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-0 z-10 bg-white border-b">
            <TabsList className="w-full h-auto flex flex-nowrap overflow-x-auto md:grid md:grid-cols-5 rounded-none bg-white">
              <TabsTrigger
                value="overview"
                onClick={() => setActiveTab("overview")}
                className={`flex-1 rounded-none border-b-2 py-4 px-1 md:px-4 text-sm md:text-base font-medium transition-all duration-200
                  ${
                    activeTab === "overview"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Overview
              </TabsTrigger>

              <TabsTrigger
                value="instructor"
                onClick={() => setActiveTab("instructor")}
                className={`flex-1 rounded-none border-b-2 py-4 px-1 md:px-4 text-sm md:text-base font-medium transition-all duration-200
                  ${
                    activeTab === "instructor"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Instructor
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-gray-50 min-h-[400px]">
            <TabsContent
              value="overview"
              className="p-6 md:p-8 animate-in fade-in-50 duration-300 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg font-medium">{courseData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6"></div>

                <p>
                  You can create a course curriculum with lessons & quizzes
                  included which is managed with an easy-to-use interface for
                  users. Having this WordPress LMS Plugin, now you have a chance
                  to quickly and easily create education, online school,
                  online-course websites with no coding knowledge required.
                </p>

                <p>
                  LearnPress is free and always will be, but it is still a
                  premium high-quality WordPress Plugin that definitely helps
                  you with making money from your WordPress Based LMS. Just try
                  and see how amazing it is. LearnPress WordPress Online Course
                  plugin is lightweight and super powerful with lots of Add- Ons
                  to empower its core system.
                </p>

                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h3 className="font-medium text-gray-900 mb-4">
                    How to use WPML Add-on for LearnPress?
                  </h3>
                  <p className="text-gray-500 italic">
                    No comments yet! You be the first to comment.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="instructor"
              className="p-6 md:p-8 animate-in fade-in-50 duration-300 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src="/placeholder.svg" alt="Instructor" />
                    <AvatarFallback>
                      {courseData.user.name[0]}
                      {courseData.user.name[1]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {courseData.user.name}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
                        <span>Courses: {courseData.videos.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 mr-1 text-gray-500" />
                        <span>Students: {courseData.myCourses.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    About the Instructor
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {courseData.user.name} is a WordPress developer with over 10
                    years of experience building websites and plugins. He
                    specializes in creating educational content and has helped
                    thousands of students learn how to build and manage their
                    own WordPress sites. His teaching approach focuses on
                    practical, hands-on learning that students can immediately
                    apply to their own projects.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}

function PlayButton() {
  return (
    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
      </svg>
    </div>
  );
}

function ReviewCard({
  name = "Tonhinho",
  date = "05/08/2025",
  rating = 10,
  comment = "",
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-amber-500" : ""}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
}
