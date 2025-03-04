import { z } from "zod";

const coursesSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "This field must contain 2 characters!" })
    .nonempty({ message: "This field cannot be empty!" }),
  description: z.string().optional(),
  price: z
    .number()
    .min(1, { message: "This field must contain 2 characters!" }),
  image: z.string().optional(),
  categoryId: z.string().nonempty({ message: "This field cannot be empty!" }),
  userId: z.string().nonempty({ message: "This field cannot be empty!" }),
  createdAt: z.date().optional(),
});

const requestCourseSchema = coursesSchema.omit({ id: true, createdAt: true });

export { coursesSchema, requestCourseSchema };
