import { LoginForm } from "@/components/pages/auth/forms/login-form";
import { RegisterForm } from "@/components/pages/auth/forms/register-form";

const LoginPage = () => {
  return (
    <main className="flex flex-row justify-center items-center">
      <div className="flex min-h-svh w-full items-center justify-center gap-10 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
