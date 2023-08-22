"use client";

import { useEffect, useState } from "react";
import { FocusEvent, ChangeEvent } from "react";
import { Validate } from "../../../libs/validation";
import React from "react";
import { InitialEmailSignUpFormFocus, InitialEmailSignUpForm } from "@/types";

export const initialEmailSignUpForm = {
  name: "",
  email: "",
  password: "",
  confirmation: "",
};

export const initialEmailSignUpHint = {
  email: Validate.email(),
  password: Validate.password(),
  confirmation: Validate.passwordConfirmation(),
};

const initialEmailSignUpFormFocus = "name";

export type EmailSignUpFormProps = {
  events: {
    recoverPasswordHandler: () => void;
    signInHandler: () => void;
    signUpHandler: (
      form: InitialEmailSignUpForm,
      e: React.MouseEvent<HTMLButtonElement>,
    ) => Promise<void>;
  };
};

export default function EmailSignUpForm({ events }: EmailSignUpFormProps) {
  const [form, setForm] = useState(initialEmailSignUpForm);
  const [hint, setHint] = useState(initialEmailSignUpHint);
  const [focusOn, setFocusOn] = useState(initialEmailSignUpFormFocus);
  const [isSignUpButtonEnabled, setIsSignUpButtonEnabled] = useState(false);

  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.name as InitialEmailSignUpFormFocus;
    setFocusOn(value);
  };

  const formHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const formKey = e.target.name;
    const formValue = e.target.value;
    setForm((p) => ({
      ...p,
      [formKey]: formValue,
    }));

    // validation hint
    switch (formKey) {
      case "email": {
        setHint((p) => ({
          ...p,
          email: Validate.email(formValue),
        }));
        break;
      }
      case "password": {
        setHint((p) => ({
          ...p,
          confirmation: Validate.passwordConfirmation(form.password, formValue),
          password: Validate.password(formValue),
        }));
        break;
      }
      case "confirmation": {
        setHint((p) => ({
          ...p,
          confirmation: Validate.passwordConfirmation(form.password, formValue),
        }));
        break;
      }
    }
  };

  useEffect(() => {
    // enable SignUpButton if inputs are valid
    let isValid = true;
    for (const key in hint) {
      const value = hint[key as keyof typeof hint];
      for (const innerKey in value) {
        const innerValue = value[innerKey as keyof typeof value];
        if (innerValue === false) {
          isValid = false;
          break;
        }
      }
    }
    setIsSignUpButtonEnabled(isValid);
  }, [hint]);

  return (
    <div className="rounded-box grid w-full max-w-xs gap-2 bg-primary bg-opacity-30 p-5 text-primary-content shadow-md backdrop-blur-md">
      <form className="form-control w-full max-w-xs">
        <label className="label" htmlFor="name">
          <span className="label-text text-primary-content">Name :</span>
        </label>
        <input
          name="name"
          type="text"
          maxLength={100}
          placeholder="Name..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
          value={form.name}
          onChange={formHandler}
          onFocus={focusHandler}
          autoFocus
        />
        <label className="label" htmlFor="email">
          <span className="label-text text-primary-content">
            Email Address :
          </span>
        </label>
        <input
          name="email"
          type="email"
          maxLength={100}
          placeholder="Email address..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
          value={form.email}
          onChange={formHandler}
          onFocus={focusHandler}
        />
        {focusOn === "email" && (
          <div className="pl-2 text-xs text-primary-content">
            {Object.entries(hint.email).map((c, i) => {
              return (
                <li
                  key={i}
                  className={`${
                    c[1] === true ? "text-success" : "text-warning"
                  }`}
                >
                  {" "}
                  {c[0]}
                </li>
              );
            })}
          </div>
        )}
        <label className="label" htmlFor="password">
          <span className="label-text text-primary-content">Password :</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password..."
          maxLength={100}
          className="input input-bordered w-full max-w-xs bg-opacity-50"
          value={form.password}
          onChange={formHandler}
          onFocus={focusHandler}
        />
        {focusOn === "password" && (
          <div className="pl-2 text-xs text-primary-content">
            {Object.entries(hint.password).map((c, i) => {
              return (
                <li
                  key={i}
                  className={`${
                    c[1] === true ? "text-success" : "text-warning"
                  }`}
                >
                  {" "}
                  {c[0]}
                </li>
              );
            })}
          </div>
        )}
        <label className="label" htmlFor="passwordConfirmation">
          <span className="label-text text-primary-content">
            Password Confirmation :
          </span>
        </label>
        <input
          name="confirmation"
          type="password"
          maxLength={100}
          placeholder="Password Confirmation..."
          className="input input-bordered w-full max-w-xs bg-opacity-50"
          value={form.confirmation}
          onChange={formHandler}
          onFocus={focusHandler}
        />
        {focusOn === "confirmation" && (
          <div className="pl-2 text-xs text-primary-content">
            dsadasd
            {Object.entries(hint.confirmation).map((c, i) => {
              return (
                <li
                  key={i}
                  className={`${
                    c[1] === true ? "text-success" : "text-warning"
                  }`}
                >
                  {" "}
                  {c[0]}
                </li>
              );
            })}
          </div>
        )}
        <button
          className="btn btn-secondary mt-4 w-full text-secondary-content"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            events.signUpHandler(form, e)
          }
          type="button"
          disabled={!isSignUpButtonEnabled}
        >
          Sign up
        </button>
      </form>
      <div className="flex justify-between ">
        <a
          className="label-text-alt cursor-pointer text-primary-content"
          onClick={events.recoverPasswordHandler}
        >
          Recover password
        </a>
        <a
          className="label-text-alt cursor-pointer text-primary-content"
          onClick={events.signInHandler}
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
