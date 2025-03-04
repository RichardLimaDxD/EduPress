import { Roles } from "@/enums/roles.enum";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email!" })
    .nonempty({ message: "This field cannot be empty!" }),
  password: z
    .string()
    .min(4, { message: "This field must contain 4 characters!" })
    .nonempty({ message: "This field cannot be empty!" }),
  name: z
    .string()
    .min(2, { message: "This field must contain 2 characters!" })
    .nonempty({ message: "This field cannot be empty!" }),
  roles: z.nativeEnum(Roles).optional().default(Roles.USER),
});

const requestUserSchema = userSchema.omit({ id: true });

const requestUpdateUserSchema = userSchema.omit({ id: true, password: true });

export { requestUserSchema, userSchema, requestUpdateUserSchema };
