import React from "react";
import { Background } from "./background";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Background />
    </>
  );
}
