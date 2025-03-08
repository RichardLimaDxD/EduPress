"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Clock, Award, Star, User, FileText } from "lucide-react";
import { CourseSProps } from "@/interfaces/courses.interface";

export default function CourseDetails({
  courseData,
}: {
  courseData: CourseSProps;
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
                value="curriculum"
                onClick={() => setActiveTab("curriculum")}
                className={`flex-1 rounded-none border-b-2 py-4 px-1 md:px-4 text-sm md:text-base font-medium transition-all duration-200
                  ${
                    activeTab === "curriculum"
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Curriculum
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
              <TabsTrigger
                value="faqs"
                onClick={() => setActiveTab("faqs")}
                className={`flex-1 rounded-none border-b-2 py-4 px-1 md:px-4 text-sm md:text-base font-medium transition-all duration-200
                  ${
                    activeTab === "faqs"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                FAQs
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 rounded-none border-b-2 py-4 px-1 md:px-4 text-sm md:text-base font-medium transition-all duration-200
                  ${
                    activeTab === "reviews"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Reviews
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-gray-50 min-h-[400px]">
            <TabsContent
              value="overview"
              className="p-6 md:p-8 animate-in fade-in-50 duration-300 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="flex items-center space-x-2 mb-6">
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200 px-3 py-1"
                  >
                    WordPress LMS
                  </Badge>
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4" />
                    <span className="ml-2 text-sm text-gray-600">
                      (24 reviews)
                    </span>
                  </div>
                </div>

                <p className="text-lg font-medium">{courseData.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="bg-blue-50 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lessons</p>
                      <p className="font-medium">24 Modules</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="bg-green-50 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">12 Hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="bg-purple-50 p-2 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Certificate</p>
                      <p className="font-medium">Yes</p>
                    </div>
                  </div>
                </div>

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
              value="curriculum"
              className="p-6 md:p-8 animate-in fade-in-50 duration-300 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Course Curriculum
                  </h3>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">24</span> lessons •{" "}
                    <span className="font-medium">12</span> hours
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="section-1"
                    className="border border-gray-200 rounded-lg mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-orange-500" />
                        <div>
                          <p className="font-medium text-left">
                            Getting Started with LearnPress
                          </p>
                          <p className="text-sm text-gray-500 text-left">
                            4 lessons • 45 minutes
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white">
                      <ul className="divide-y divide-gray-100">
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <PlayButton />
                            <span className="ml-3">
                              Introduction to LearnPress
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">10:15</span>
                        </li>
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <PlayButton />
                            <span className="ml-3">Installation and Setup</span>
                          </div>
                          <span className="text-sm text-gray-500">12:30</span>
                        </li>
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <PlayButton />
                            <span className="ml-3">
                              Creating Your First Course
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">15:45</span>
                        </li>
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <PlayButton />
                            <span className="ml-3">Managing Students</span>
                          </div>
                          <span className="text-sm text-gray-500">8:20</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="section-2"
                    className="border border-gray-200 rounded-lg mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-orange-500" />
                        <div>
                          <p className="font-medium text-left">
                            Advanced Course Creation
                          </p>
                          <p className="text-sm text-gray-500 text-left">
                            6 lessons • 1 hour 20 minutes
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white">
                      <ul className="divide-y divide-gray-100">
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <PlayButton />
                            <span className="ml-3">
                              Creating Quizzes and Assessments
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">18:30</span>
                        </li>
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <PlayButton />
                            <span className="ml-3">
                              Adding Multimedia Content
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">14:15</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      John Peterson
                    </h3>
                    <p className="text-gray-500">
                      WordPress Developer & Educator
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
                        <span>12 Courses</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-gray-500" />
                        <span>2,450+ Students</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-amber-500 fill-amber-500" />
                        <span>4.8 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    About the Instructor
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    John is a WordPress developer with over 10 years of
                    experience building websites and plugins. He specializes in
                    creating educational content and has helped thousands of
                    students learn how to build and manage their own WordPress
                    sites. His teaching approach focuses on practical, hands-on
                    learning that students can immediately apply to their own
                    projects.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="faqs"
              className="p-6 md:p-8 animate-in fade-in-50 duration-300 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="faq-1"
                    className="border border-gray-200 rounded-lg mb-3"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                      Is LearnPress completely free to use?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-1 text-gray-700">
                      Yes, LearnPress core plugin is completely free and will
                      always remain free. However, there are premium add-ons
                      available that extend functionality for specific needs.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="faq-2"
                    className="border border-gray-200 rounded-lg mb-3"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                      Can I sell courses with LearnPress?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-1 text-gray-700">
                      Yes, LearnPress allows you to create and sell courses
                      online. You can set prices, create coupons, and manage
                      payments through various payment gateways.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="faq-3"
                    className="border border-gray-200 rounded-lg mb-3"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                      Is LearnPress compatible with my theme?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-1 text-gray-700">
                      LearnPress is designed to work with most WordPress themes.
                      However, for the best experience, it's recommended to use
                      a theme that is specifically designed for or compatible
                      with LearnPress.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="faq-4"
                    className="border border-gray-200 rounded-lg"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                      How do I get support for LearnPress?
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-1 text-gray-700">
                      LearnPress offers support through their WordPress.org
                      plugin page, documentation, and premium support for users
                      who purchase add-ons or bundles.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent
              value="reviews"
              className="p-6 md:p-8 animate-in fade-in-50 duration-300 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Student Reviews
                  </h3>
                  <div className="flex items-center bg-gray-100 rounded-lg p-3">
                    <div className="text-4xl font-bold text-gray-900 mr-3">
                      4.8
                    </div>
                    <div>
                      <div className="flex text-amber-500 mb-1">
                        <Star className="h-5 w-5 fill-amber-500" />
                        <Star className="h-5 w-5 fill-amber-500" />
                        <Star className="h-5 w-5 fill-amber-500" />
                        <Star className="h-5 w-5 fill-amber-500" />
                        <Star className="h-5 w-5 fill-amber-500 fill-opacity-50" />
                      </div>
                      <p className="text-sm text-gray-500">
                        Based on 24 reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <ReviewCard
                    name="Sarah Johnson"
                    date="2 months ago"
                    rating={5}
                    comment="LearnPress has completely transformed how I create and sell courses online. The interface is intuitive and the features are exactly what I needed. Highly recommend!"
                  />

                  <ReviewCard
                    name="Michael Chen"
                    date="3 months ago"
                    rating={4}
                    comment="Great plugin with lots of functionality. I was able to set up my course site in just a few days. The only reason I'm not giving 5 stars is because I had some minor issues with the quiz feature, but support helped me resolve them."
                  />

                  <ReviewCard
                    name="Emily Rodriguez"
                    date="1 month ago"
                    rating={5}
                    comment="As someone with limited technical knowledge, I found LearnPress incredibly easy to use. The documentation is clear and the plugin itself is very user-friendly. I'm now running a successful online course business!"
                  />
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
