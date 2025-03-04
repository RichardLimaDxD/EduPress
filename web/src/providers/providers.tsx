import { CategoriesProviders } from "@/contexts/categories.context";
import { CoursesProviders } from "@/contexts/couses.context";
import { UsersProviders } from "@/contexts/users.context";
import { Children } from "@/interfaces/children.interface";

const Providers = ({ children }: Children) => {
  return (
    <UsersProviders>
      <CategoriesProviders>
        <CoursesProviders>{children}</CoursesProviders>
      </CategoriesProviders>
    </UsersProviders>
  );
};

export { Providers };
