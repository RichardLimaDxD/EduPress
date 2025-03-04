import { z } from "zod";

const categoriesSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, { message: "This field must contain 2 characters!" })
    .nonempty({ message: "This field cannot be empty!" }),
  _count: z.object({
    course: z.number(),
  }),
});

const requestCategoriesSchema = categoriesSchema.omit({
  id: true,
  _count: true,
});

export { requestCategoriesSchema, categoriesSchema };
