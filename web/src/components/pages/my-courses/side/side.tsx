"use client";
import {
  Check,
  ChevronRight,
  FileText,
  Layers,
  Plus,
  Upload,
  X,
} from "lucide-react";

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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";

const CoursePanel = () => {
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
            <TabsContent value="details" className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="Enter course title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter course description"
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter course price"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Card>
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
                      />
                      <div className="flex flex-col items-center gap-1 text-muted-foreground pointer-events-none">
                        <Upload className="h-8 w-8" />
                        <span>Upload image</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Course Thumbnail
                    </CardTitle>
                    <CardDescription>Upload a video</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg border-muted-foreground/25 cursor-pointer hover:bg-muted/50 transition-colors relative">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-1 text-muted-foreground pointer-events-none">
                        <Upload className="h-8 w-8" />
                        <span>Upload video</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="p-6 space-y-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Course Modules</CardTitle>
                    <CardDescription>
                      Add modules to organize your course content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="h-5 w-5 text-muted-foreground" />
                          <span>Introduction Module</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="h-4 w-4" />
                      Add Module
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Course Materials
                    </CardTitle>
                    <CardDescription>
                      Upload additional resources for your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span>Course Workbook.pdf</span>
                        </div>
                        <X className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="h-4 w-4" />
                      Add Material
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Course Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="Enter duration"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Course Features</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Toggle variant="outline" aria-label="Certificate">
                      <Check className="mr-2 h-4 w-4" />
                      Certificate
                    </Toggle>
                    <Toggle variant="outline" aria-label="Downloadable">
                      <Check className="mr-2 h-4 w-4" />
                      Downloadable
                    </Toggle>
                    <Toggle variant="outline" aria-label="Assignments">
                      <Check className="mr-2 h-4 w-4" />
                      Assignments
                    </Toggle>
                    <Toggle variant="outline" aria-label="Forum Access">
                      <Check className="mr-2 h-4 w-4" />
                      Forum Access
                    </Toggle>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (if premium)</Label>
                  <Input id="price" type="number" placeholder="Enter price" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <SheetFooter className="px-6 py-4 border-t">
            <div className="flex w-full gap-2">
              <SheetClose asChild>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </SheetClose>
              <Button className="flex-1">Create Course</Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { CoursePanel };
