import { z } from "zod";

const videosSchema = z.object({
  id: z.string(),
  video_url: z.string().optional(),
  title: z.string().nonempty({ message: "This field cannot be empty!" }),
  courseId: z.string(),
});

const requestVideoSchema = videosSchema.omit({ id: true });

export { videosSchema, requestVideoSchema };
