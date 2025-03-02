import authSchema from "@/schemas/auth.schema";
import { requestUserSchema, userSchema } from "@/schemas/users.schema";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

type UsersProps = z.infer<typeof userSchema>;

type UserRequestProps = z.infer<typeof requestUserSchema>;

type AuthProps = z.infer<typeof authSchema>;

interface UsersContextProps {
  create: (formData: UserRequestProps) => Promise<void>;
  seasson: (formData: AuthProps) => Promise<void>;
  retrieveUserByToken: () => Promise<void>;
  logout: () => void;
  user: UsersProps | null;
  setUser: Dispatch<SetStateAction<UsersProps | null>>;
}

export type { UsersProps, AuthProps, UsersContextProps, UserRequestProps };
