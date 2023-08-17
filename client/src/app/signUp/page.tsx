"use client";
import { useRouter } from "next/navigation";
import EmailInputForm, {
  initialEmailSignUpForm,
} from "../../components/emailSignUpForm";
import { useEmailSignUpMutation } from "@/redux/features/api-slice";
import { useEffect } from "react";

export default function Page() {
  const [emailSignUp, emailSignUpResult] = useEmailSignUpMutation();
  const router = useRouter();

  useEffect(() => {
    console.log(
      "🚀 ~ file: page.tsx:9 ~ Page ~ emailSignUpResult:",
      emailSignUpResult,
    );
  });

  const signUpHandler = async (form: initialEmailSignUpForm) => {
    await emailSignUp({
      email: form.email,
      name: form.email,
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
    <main className="flex h-full items-center justify-center ">
      <EmailInputForm
        events={{ recoverPasswordHandler, signInHandler, signUpHandler }}
      />
    </main>
  );
}
