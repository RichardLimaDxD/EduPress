"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle, Loader2, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RequestUpdateUserProps } from "@/interfaces/users.interface";
import { requestUpdateUserSchema } from "@/schemas/users.schema";
import { useUsers } from "@/hooks/users.hook";
import { Roles } from "@/enums/roles.enum";

const AccountDashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const defaultValues: Partial<RequestUpdateUserProps> = {
    name: "John Doe",
    email: "john.doe@example.com",
    roles: Roles.USER,
  };

  const form = useForm<RequestUpdateUserProps>({
    resolver: zodResolver(requestUpdateUserSchema),
    defaultValues,
  });

  const { user, updateUser, deleteAccount, updateUserRole } = useUsers();

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("roles", user.roles);
    }
  }, [user, form]);

  const onSubmit = async (formData: RequestUpdateUserProps) => {
    setIsLoading(true);
    try {
      await updateUser(user!.id, formData);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteAccount = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteAccount(user!.id);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const onRoleChange = async () => {
    const newRole = user!.roles === "USER" ? "SELLER" : "USER";
    await updateUserRole(user!.id, newRole);
  };

  return (
    <div className="flex flex-col justify-center items-center container mt-10 mb-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormDescription>
                        We'll use this email to contact you.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-400 hover:bg-orange-600 duration-300 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seller Status</CardTitle>
                <CardDescription>
                  Enable seller mode to list products and services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Seller Mode</FormLabel>
                        <FormDescription>
                          Activate seller features on your account.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === "SELLER"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "SELLER" : "USER")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("roles") === "SELLER" && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Seller mode activated</AlertTitle>
                    <AlertDescription>
                      You now have access to seller features. You can list
                      products and services.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={onRoleChange}
                  disabled={isLoading}
                  className="cursor-pointer bg-orange-400 hover:bg-orange-600 duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4 cursor-pointer" />
                      Change Role
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that affect your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all of your data. This
                action cannot be undone.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer">
                  <Trash2 className="mr-2 h-4 w-4 cursor-pointer" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleteLoading}
                  >
                    {isDeleteLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin cursor-pointer" />
                        Deleting...
                      </>
                    ) : (
                      <p className="text-white cursor-pointer">
                        Delete Account
                      </p>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default AccountDashboard;
