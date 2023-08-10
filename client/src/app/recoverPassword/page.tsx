"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const signInHandler = () => {
    router.push("/signIn");
  };

  const signUpHandler = () => {
    router.push("/signUp");
  };

  const sendResetEmailHandler = () => {
    // TODO:
    // Post request to backend to trigger reset email
    console.log("reset email");
  };
  return (
    <main className="flex h-full items-center justify-center">
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
        </div>
        <button
          className="btn btn-secondary w-full text-secondary-content"
          onClick={sendResetEmailHandler}
        >
          Send Reset Email
        </button>
        <div className="flex justify-between ">
          <a
            className="label-text-alt cursor-pointer text-primary-content"
            onClick={signInHandler}
          >
            Sign in
          </a>
          <a
            className="label-text-alt cursor-pointer text-primary-content"
            onClick={signUpHandler}
          >
            Sign up
          </a>
        </div>
      </div>
    </main>
  );
}
