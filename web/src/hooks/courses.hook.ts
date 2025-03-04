import { CoursesContext } from "@/contexts/couses.context";
import { useContext } from "react";

const useCouses = () => useContext(CoursesContext);

export { useCouses };
