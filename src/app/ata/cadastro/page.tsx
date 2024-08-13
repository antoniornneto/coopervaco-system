import Header from "@/components/ui/header";
import SignUpForm from "@/modules/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="flex flex-col h-screen">
      <title>Coopervaço - Cadastro</title>
      <Header />
      <div className="flex flex-1">
        <div className="backgroundImage flex-1"></div>
        <div className="flex flex-1 items-center justify-center">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
