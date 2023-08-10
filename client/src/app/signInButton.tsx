"use client";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter();
  const signInHandler = () => {
    router.push("/signIn");
  };
  return (
    <button
      onClick={signInHandler}
      className="btn btn-square btn-primary min-w-fit pl-5 pr-5 text-center text-primary-content"
    >
      sign in
    </button>
  );
}
