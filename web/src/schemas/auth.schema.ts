import { z } from "zod";

const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Formato de e-mail inválido." })
    .nonempty({ message: "Esse campo não pode estar vazio." }),
  password: z
    .string()
    .trim()
    .min(2, { message: "Esse campo deve conter 3 caractéres!" })
    .nonempty({ message: "Esse campo não pode estar vazio!" }),
});

export default authSchema;
