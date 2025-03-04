import {
  categoriesSchema,
  requestCategoriesSchema,
} from "@/schemas/categories.schema";
import { z } from "zod";

interface CategoriesContextProps {
  getAll: () => Promise<void>;
  create: (formData: RequestCategoriesProps) => Promise<void>;
  categories: CategoriesProps[] | [];
  deleteCategory: (id: string) => Promise<void>;
  updateCategory: (
    id: string,
    formData: RequestCategoriesProps
  ) => Promise<void>;
}

type CategoriesProps = z.infer<typeof categoriesSchema>;

type RequestCategoriesProps = z.infer<typeof requestCategoriesSchema>;

export type { CategoriesContextProps, CategoriesProps, RequestCategoriesProps };
