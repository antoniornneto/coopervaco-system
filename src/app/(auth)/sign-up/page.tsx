import SignUpForm from "@/components/form/SignUpForm";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="w-full">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </div>
  );
};

export default page;
