"use client";
import { Loader, Plus, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { useCouses } from "@/hooks/courses.hook";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/hooks/categories.hook";
import { requestCourseSchema } from "@/schemas/courses.schema";
import { RequestCoursesProps } from "@/interfaces/courses.interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateVideosForm } from "./create-videos";

const CreateCoursePanel = () => {
  const { categories } = useCategories();
  const { createCourse, setImageFile, isLoading } = useCouses();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RequestCoursesProps>({
    resolver: zodResolver(requestCourseSchema),
  });

  const submitCreateCourse = async (data: RequestCoursesProps) => {
    await createCourse(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="gap-2 cursor-pointer">
          <Plus className="h-5 w-5" />
          Create Course
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[450px] max-w-[90vw] p-0 sm:max-w-[90vw]"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl">Create New Course</SheetTitle>
            </div>
            <SheetDescription>
              Fill in the details to create your new course
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="details" className="flex-1 overflow-auto">
            <div className="border-b px-6">
              <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Course
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Video
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="details" className="p-6 space-y-6">
              <form onSubmit={handleSubmit(submitCreateCourse)}>
                <Card className="mb-10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Course Thumbnail
                    </CardTitle>
                    <CardDescription>
                      Upload an image to represent your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg border-muted-foreground/25 cursor-pointer hover:bg-muted/50 transition-colors relative">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) =>
                          setImageFile(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                      <div className="flex flex-col items-center gap-1 text-muted-foreground pointer-events-none">
                        <Upload className="h-8 w-8" />
                        <span>Upload image</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter course title"
                      {...register("title")}
                    />
                    {errors.title?.message && (
                      <p className="text-red-500 text-xs font-bold">
                        {" "}
                        * {errors.title?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter course description"
                      className="min-h-[120px]"
                      {...register("description")}
                    />
                    {errors.description?.message && (
                      <p className="text-red-500 text-xs font-bold">
                        {" "}
                        * {errors.description?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter course price"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price?.message && (
                      <p className="text-red-500 text-xs font-bold">
                        {" "}
                        * {errors.price?.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        onValueChange={(value) => setValue("categoryId", value)}
                        value={watch("categoryId")}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-orange-400 hover:bg-orange-600 duration-300 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        Save
                        <Save className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="content" className="p-6 space-y-6">
              <CreateVideosForm />
            </TabsContent>
          </Tabs>

          <SheetFooter className="px-6 py-4 border-t">
            <div className="flex w-full gap-2">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="flex-1 bg-red-700 text-white hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  Cancel
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { CreateCoursePanel };
