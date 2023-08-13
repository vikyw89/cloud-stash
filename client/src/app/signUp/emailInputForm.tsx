"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const initialForm = {
  email: "",
  password: "",
  confirmation: "",
};

export default function EmailInputForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);

  const recoverPasswordHandler = () => {
    router.push("/recoverPassword");
  };

  const signInHandler = () => {
    router.push("/signIn");
  };

  const signUpHandler = () => {};

  const formHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formKey = e.target.id;
    const formValue = e.target.value;
    setForm((p) => ({
      ...p,
      [formKey]: formValue,
    }));
  };

  return (
    <div className="rounded-box grid w-full max-w-xs gap-2 bg-primary bg-opacity-30 p-5 text-primary-content shadow-md backdrop-blur-md">
      <form className="form-control w-full max-w-xs" onChange={formHandler}>
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
          value={form.email}
        />
        <label className="label" htmlFor="password">
          <span className="label-text text-primary-content">Password :</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
          value={form.password}
        />
        <label className="label" htmlFor="passwordConfirmation">
          <span className="label-text text-primary-content">
            Password Confirmation :
          </span>
        </label>
        <input
          id="confirmation"
          type="password"
          placeholder="Password Confirmation..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
          value={form.confirmation}
        />
        <button
          className="btn btn-secondary mt-4 w-full text-secondary-content"
          onClick={signUpHandler}
          type="submit"
        >
          Sign up
        </button>
      </form>
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
