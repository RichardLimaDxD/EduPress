"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useUsers } from "@/hooks/users.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRequestProps, UsersProps } from "@/interfaces/users.interface";
import { requestUserSchema } from "@/schemas/users.schema";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequestProps>({
    resolver: zodResolver(requestUserSchema),
  });

  const { create } = useUsers();

  const submit = (data: UserRequestProps) => {
    create(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-xs font-bold">
                    {" "}
                    * {errors.name?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Input
                  id="email"
                  placeholder="email@example.com"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-xs font-bold">
                    {" "}
                    * {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center"></div>
                <Input
                  id="password"
                  type="password"
                  placeholder="************************"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs font-bold">
                    {" "}
                    * {errors.password?.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="cursor-pointer rounded-full w-full bg-orange-400 hover:bg-orange-600 duration-300"
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export { RegisterForm };
