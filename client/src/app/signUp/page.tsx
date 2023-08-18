"use client";
import { useRouter } from "next/navigation";
import EmailInputForm, {
  initialEmailSignUpForm,
} from "../components/emailSignUpForm";

import React from "react";
import { useEmailSignUpMutation } from "../../redux/features/api-slice";

export default function Page() {
  const [emailSignUp] = useEmailSignUpMutation();
  const router = useRouter();

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
