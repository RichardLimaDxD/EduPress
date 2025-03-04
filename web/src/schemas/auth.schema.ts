import { z } from "zod";

const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format." })
    .nonempty({ message: "This field cannot be empty." }),
  password: z
    .string()
    .trim()
    .min(3, { message: "This field must contain at least 3 characters!" })
    .nonempty({ message: "This field cannot be empty!" }),
});

export default authSchema;
