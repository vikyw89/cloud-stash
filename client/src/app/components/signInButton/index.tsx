import React from "react";

export type SignInButtonProps = {
  events: {
    signInHandler: () => void;
  };
};

export default function SignInButton({ events }: SignInButtonProps) {
  return (
    <button
      onClick={events.signInHandler}
      className="btn btn-square btn-primary min-w-fit pl-5 pr-5 text-center text-primary-content"
    >
      sign in
    </button>
  );
}
