"use client";
import { useRouter } from "next/navigation";
import SignInButton from "../components/signInButton";

export default function Home() {
  const router = useRouter();

  const signInHandler = () => {
    router.push("/signIn");
  };

  return (
    <main className="z-0">
      <div id="landing-page" className="flex h-screen items-end">
        <div className="mb-20 grid justify-items-end gap-2 bg-opacity-0 p-5 text-right text-6xl font-extrabold text-primary-content">
          <h1>YOUR CLOUD INVENTORY</h1>
          <SignInButton events={{ signInHandler }} />
        </div>
      </div>
    </main>
  );
}
