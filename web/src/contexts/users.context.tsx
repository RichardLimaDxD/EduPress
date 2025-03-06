"use client";
import {
  AuthProps,
  RequestUpdateUserProps,
  UserRequestProps,
  UsersContextProps,
  UsersProps,
} from "@/interfaces/users.interface";
import api from "@/service/api";
import { Children } from "@/interfaces/children.interface";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { destroyCookie, parseCookies, setCookie } from "nookies";

const UsersContext = createContext({} as UsersContextProps);

const UsersProviders = ({ children }: Children) => {
  const [user, setUser] = useState<UsersProps | null>(null);
  const [retrieveToken, setRetrieveToken] = useState<string | null>(null);
  const cookies = parseCookies();
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

  const session = async (formData: AuthProps) => {
    try {
      const response = await api.post("/login", formData);

      const { token } = response.data;

      setCookie(null, "token", token);

      setRetrieveToken(token);

      await retrieveUserByToken(token);

      toast.success("Welcome!");
      router.push("/");
    } catch (error) {
      toast.error("Check your user information!");
    }
  };

  const retrieveUserByToken = async (token: string) => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      logout();
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      });
      toast.success("Your account has been deleted successfully.");
      logout();
    } catch {
      toast.error("Error deleting account.");
    }
  };

  const updateUser = async (id: string, formData: RequestUpdateUserProps) => {
    try {
      const response = await api.patch(`/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      });

      setUser(response.data);
      toast.success("Your profile has been updated successfully.");
    } catch (error) {
      toast.error("Error updating account.");
    }
  };

  const updateUserRole = async (id: string, currentRole: string) => {
    try {
      const newRole = currentRole === "USER" ? "SELLER" : "USER";

      const response = await api.patch(
        `/users/${id}`,
        { roles: newRole },
        {
          headers: {
            Authorization: `Bearer ${cookies["token"]}`,
          },
        }
      );
      setUser(response.data);
      toast.success("Your profile has been updated successfully.");
    } catch (error) {
      toast.error("Error updating account.");
    }
  };

  const logout = () => {
    setCookie(null, "token", "", {
      path: "/",

      maxAge: 0,
    });

    destroyCookie(null, "token", {
      path: "/",
    });

    setUser(null);

    toast("Logging out...");

    router.push("/login");
  };

  useEffect(() => {
    if (cookies["token"]) {
      retrieveUserByToken(cookies["token"]);
    }
  }, [cookies["token"]]);

  return (
    <UsersContext.Provider
      value={{
        user,
        setUser,
        session,
        logout,
        retrieveUserByToken,
        create,
        deleteAccount,
        updateUserRole,
        updateUser,
        retrieveToken,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProviders };
