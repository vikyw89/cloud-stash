import SignInButton from "./signInButton";

export default function Home() {

  return (
    <main className="z-0">
      <div id="landing-page" className="flex h-screen items-end">
        <div className="mb-20 bg-opacity-0 p-5 text-right text-6xl font-extrabold text-primary-content">
          <h1>YOUR CLOUD INVENTORY</h1>
          <SignInButton />
        </div>
      </div>
    </main>
  );
}
