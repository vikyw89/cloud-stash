"use client";
import { useRouter } from "next/navigation";
import { InitialEmailSignUpForm } from "@/types";
import { useEmailSignUpMutation } from "../../redux/features/api-slice";
import EmailSignUpForm from "../components/emailSignUpForm";

function Page() {
  const [emailSignUp] = useEmailSignUpMutation();
  const router = useRouter();

  const signUpHandler = async (form: InitialEmailSignUpForm) => {
    await emailSignUp({
      email: form.email,
      name: form.name,
      password: form.password,
    });
  };

  const signInHandler = () => {
    router.push("/signIn");
  };

  const recoverPasswordHandler = () => {
    router.push("/recoverPassword");
  };

  return (
    <main className="flex h-full items-center justify-center">
      <EmailSignUpForm
        events={{ recoverPasswordHandler, signInHandler, signUpHandler }}
      />
    </main>
  );
}

export default Page;
