import { z } from "zod";

const buyCourseSchema = z.object({
  id: z.string(),
  courseId: z.string().nonempty({ message: "This field cannot be empty!" }),
  userId: z.string().nonempty({ message: "This field cannot be empty!" }),
});

const requestBuyCourseSchema = buyCourseSchema.omit({ id: true });

export { buyCourseSchema, requestBuyCourseSchema };
