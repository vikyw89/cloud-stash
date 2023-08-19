"use client";

import React from "react";
import { Background } from "./background";
import { Notifications } from "./components/notifications";
import { useAppSelector } from "./hooks";

export default function Template({ children }: { children: React.ReactNode }) {
  const notifications = useAppSelector((state) => state.notif);

  return (
    <>
      <Notifications data={notifications} />
      {children}
      <Background />
    </>
  );
}
