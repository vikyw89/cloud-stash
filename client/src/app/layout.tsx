import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React from "react";
import ReduxProvider from "../redux/provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Stash",
  description: "Your cloud inventory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} fixed inset-0 -z-40`}>
        <ReduxProvider> {children}</ReduxProvider>
      </body>
    </html>
  );
}
