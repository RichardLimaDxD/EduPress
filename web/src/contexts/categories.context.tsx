"use client";

import api from "@/service/api";
import {
  CategoriesContextProps,
  CategoriesProps,
  RequestCategoriesProps,
} from "@/interfaces/categories.interface";
import { Children } from "@/interfaces/children.interface";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { parseCookies } from "nookies";

const CategoriesContext = createContext({} as CategoriesContextProps);

const CategoriesProviders = ({ children }: Children) => {
  const [categories, setCategories] = useState<CategoriesProps[] | []>([]);
  const cookies = parseCookies();
  const token = cookies["token"];

  useEffect(() => {
    getAll();
  }, []);

  const create = async (formData: RequestCategoriesProps) => {
    try {
      await api.post("/categories", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category created successfully.");
    } catch (error) {
      toast.error("Failed to create category.");
    }
  };

  const getAll = async () => {
    try {
      const response = await api.get("/categories");

      const { data } = response;

      setCategories(data);
    } catch (error) {}
  };

  const deleteCategory = async (id: string) => {
    try {
      await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category deleted successfully.");
    } catch (error) {
      toast.success("Failed to delete category.");
    }
  };

  const updateCategory = async (
    id: string,
    formData: RequestCategoriesProps
  ) => {
    try {
      await api.patch(`/categories/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category updated successfully.");
    } catch (error) {
      toast.success("Failed to update category.");
    }
  };

  return (
    <CategoriesContext.Provider
      value={{ getAll, categories, create, deleteCategory, updateCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProviders };
