import { UsersContext } from "@/contexts/users.context";
import { useContext } from "react";

const useUsers = () => useContext(UsersContext);

export { useUsers };
