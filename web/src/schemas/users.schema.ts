import { Roles } from "@/enums/roles.enum";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .trim()
    .email({ message: "Digite um email valido!" })
    .nonempty({ message: "Esse campo não pode estar vazio!" }),
  password: z
    .string()
    .min(2, { message: "Esse campo deve conter 8 caractéres!" })
    .nonempty({ message: "Esse campo não pode estar vazio!" }),
  name: z
    .string()
    .min(2, { message: "Esse campo deve conter 2 caractéres!" })
    .nonempty({ message: "Esse campo não pode estar vazio!" }),
  roles: z.nativeEnum(Roles).optional().default(Roles.USER),
});

const requestUserSchema = userSchema.omit({ id: true });

export { requestUserSchema, userSchema };
