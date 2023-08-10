"use client";

import { useRouter } from "next/navigation";

export default function EmailInputForm() {
  const router = useRouter();
  const recoverPasswordHandler = () => {
    router.push("/recoverPassword");
  };
  const signInHandler = () => {
    router.push("/signIn");
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
        <label className="label" htmlFor="passwordConfirmation">
          <span className="label-text text-primary-content">
            Password Confirmation :
          </span>
        </label>
        <input
          id="passwordConfirmation"
          type="password"
          placeholder="Password Confirmation..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
        />
      </div>
      <button className="btn btn-secondary w-full text-secondary-content">
        Sign up
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
          onClick={signInHandler}
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
