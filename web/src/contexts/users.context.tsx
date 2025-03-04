"use client";
import {
  AuthProps,
  UserRequestProps,
  UsersContextProps,
  UsersProps,
} from "@/interfaces/users.interface";
import api from "@/service/api";
import { Children } from "@/interfaces/children.interface";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const UsersContext = createContext({} as UsersContextProps);

const UsersProviders = ({ children }: Children) => {
  const [user, setUser] = useState<UsersProps | null>(null);
  const router = useRouter();

  const create = async (formData: UserRequestProps) => {
    try {
      await api.post<UserRequestProps>("/users", formData);

      toast.success("User created successfully.");
      router.push("/login");
    } catch (error) {
      toast.error("User already exists!");
    }
  };

  const seasson = async (formData: AuthProps) => {
    try {
      const response = await api.post("/login", formData);

      const { token } = response.data;

      Cookies.set("token", token, { expires: 1, path: "" });

      toast.success("Welcome!");

      router.push("/");
    } catch (error) {
      toast.error("Check your user information!");
    }
  };

  const retrieveUserByToken = async () => {
    try {
      const token = Cookies.get("token");

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      setUser(data);
    } catch (_) {
      logout();
    }
  };

  const logout = () => {
    Cookies.remove("token");

    toast("Logging out...");

    router.push("/login");
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      retrieveUserByToken();
    } else {
      Cookies.remove("token");
    }
  }, []);

  return (
    <UsersContext.Provider
      value={{ user, setUser, seasson, logout, retrieveUserByToken, create }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProviders };
