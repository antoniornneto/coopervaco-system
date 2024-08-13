import Header from "@/components/ui/header";
import LoginForm from "@/modules/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-col h-screen">
      <title>Coopervaço - Login</title>
      <Header />
      <div className="flex flex-1">
        <div className="backgroundImage flex-1"></div>
        <div className="flex flex-1 items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
