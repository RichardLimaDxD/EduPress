import authSchema from "@/schemas/auth.schema";
import {
  requestUpdateUserSchema,
  requestUserSchema,
  userSchema,
} from "@/schemas/users.schema";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

type UsersProps = z.infer<typeof userSchema>;

type UserRequestProps = z.infer<typeof requestUserSchema>;

type RequestUpdateUserProps = z.infer<typeof requestUpdateUserSchema>;

type AuthProps = z.infer<typeof authSchema>;

interface UsersContextProps {
  create: (formData: UserRequestProps) => Promise<void>;
  session: (formData: AuthProps) => Promise<void>;
  retrieveUserByToken: (token: string) => Promise<void>;
  logout: () => void;
  user: UsersProps | null;
  setUser: Dispatch<SetStateAction<UsersProps | null>>;
  deleteAccount: (id: string) => Promise<void>;
  updateUserRole: (id: string, currentRole: string) => Promise<any>;
  updateUser: (id: string, formData: RequestUpdateUserProps) => Promise<void>;
  retrieveToken: string | null;
}

export type {
  UsersProps,
  AuthProps,
  UsersContextProps,
  RequestUpdateUserProps,
  UserRequestProps,
};
