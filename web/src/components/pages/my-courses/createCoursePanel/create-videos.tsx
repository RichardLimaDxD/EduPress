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
import { useCouses } from "@/hooks/courses.hook";
import { RequestVideoProps } from "@/interfaces/videos.interface";
import { requestVideoSchema } from "@/schemas/videos.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Save, Upload } from "lucide-react";
import { useForm } from "react-hook-form";

const CreateVideosForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestVideoProps>({
    resolver: zodResolver(requestVideoSchema),
  });

  const { setVideoFile, createVideo, courseId, isLoading } = useCouses();

  const submit = (formData: RequestVideoProps) => {
    formData.courseId = courseId;
    createVideo(formData);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Card className="mb-10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Video</CardTitle>
          <CardDescription>Upload video</CardDescription>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            value={courseId}
            {...register("courseId")}
            className="invisible"
          />
          <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg border-muted-foreground/25 cursor-pointer hover:bg-muted/50 transition-colors relative">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) =>
                setVideoFile(e.target.files ? e.target.files[0] : null)
              }
            />
            <div className="flex flex-col items-center gap-1 text-muted-foreground pointer-events-none">
              <Upload className="h-8 w-8" />
              <span>Upload video</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title1">Video title</Label>
          <Input
            id="title1"
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
  );
};

export { CreateVideosForm };
