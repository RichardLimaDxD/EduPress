import { CategoriesContext } from "@/contexts/categories.context";
import { useContext } from "react";

const useCategories = () => useContext(CategoriesContext);

export { useCategories };
