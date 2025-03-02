import { UsersProviders } from "@/contexts/users.context";
import { Children } from "@/interfaces/children.interface";

const Providers = ({ children }: Children) => {
  return <UsersProviders>{children}</UsersProviders>;
};

export { Providers };
