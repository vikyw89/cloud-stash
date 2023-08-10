"use client";
import EmailInputForm from "./emailInputForm";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Page() {
  const [emailAddress, setEmailAddress] = useState("");
  console.log(
    "🚀 ~ file: page.tsx:8 ~ Page ~ setEmailAddress:",
    setEmailAddress,
  );
  console.log("🚀 ~ file: page.tsx:8 ~ Page ~ emailAddress:", emailAddress);
  const dispatch = useDispatch();
  console.log("🚀 ~ file: page.tsx:11 ~ Page ~ dispatch:", dispatch);

  return (
    <main className="flex h-full items-center justify-center">
      <EmailInputForm />
    </main>
  );
}
