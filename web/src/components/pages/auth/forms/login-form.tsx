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
import { AuthProps } from "@/interfaces/users.interface";
import { useForm } from "react-hook-form";
import { useUsers } from "@/hooks/users.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import authSchema from "@/schemas/auth.schema";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>({
    resolver: zodResolver(authSchema),
  });

  const { seasson } = useUsers();

  const submit = (data: AuthProps) => {
    seasson(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Digite seu e-mail abaixo para fazer login em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-8">
              <div className="grid gap-2">
                <Label htmlFor="email" className="cursor-pointer">
                  E-mail
                </Label>
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
                <div className="flex items-center">
                  <Label htmlFor="password" className="cursor-pointer">
                    Senha
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
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
                className="cursor-pointer w-full bg-orange-400 hover:bg-orange-600 duration-300"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export { LoginForm };
