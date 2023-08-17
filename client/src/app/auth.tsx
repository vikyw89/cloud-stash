"use client";
import { useEffect, useState } from "react";

export default function Auth() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const status = localStorage["Auth"];
    setAccount(status);
  }, []);

  return {
    account,
  };
}
