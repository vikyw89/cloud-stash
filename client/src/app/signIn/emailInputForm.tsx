"use client";

import { signIn, useSignInQuery } from "@/redux/features/api-slice";
import { useRouter } from "next/navigation";

export default function EmailInputForm() {
  const { data, isError, isLoading } = useSignInQuery({
    email: "abcd",
    password: "12345",
  });
  console.log(
    "🚀 ~ file: emailInputForm.tsx:11 ~ EmailInputForm ~ isLoading:",
    isLoading,
  );
  console.log(
    "🚀 ~ file: emailInputForm.tsx:11 ~ EmailInputForm ~ isError:",
    isError,
  );
  console.log(
    "🚀 ~ file: emailInputForm.tsx:11 ~ EmailInputForm ~ data:",
    data,
  );
  const router = useRouter();
  const recoverPasswordHandler = () => {
    router.push("/recoverPassword");
  };
  const signUpHandler = () => {
    router.push("/signUp");
  };
  const signInHandler = async () => {
    // TODO: send sign in to backend, return refresh token and jwt token
    // store token
    const res = await signIn({ email: "abcd", password: "12345" });
    console.log("signIn");
  };
  return (
    <div className="rounded-box grid w-full max-w-xs gap-2 bg-primary bg-opacity-30 p-5 text-primary-content shadow-md backdrop-blur-md">
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="email">
          <span className="label-text text-primary-content">
            Email Address :
          </span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email address..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
        />
        <label className="label" htmlFor="password">
          <span className="label-text text-primary-content">Password :</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
        />
      </div>
      <button
        className="btn btn-secondary w-full text-secondary-content"
        onClick={signInHandler}
      >
        Sign in
      </button>
      <div className="flex justify-between ">
        <a
          className="label-text-alt cursor-pointer text-primary-content"
          onClick={recoverPasswordHandler}
        >
          Recover password
        </a>
        <a
          className="label-text-alt cursor-pointer text-primary-content"
          onClick={signUpHandler}
        >
          Sign up
        </a>
      </div>
    </div>
  );
}
