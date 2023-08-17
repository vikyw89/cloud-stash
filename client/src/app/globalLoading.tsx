"use client";

import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { useAppSelector } from "./hooks";

export default function GlobalLoading() {
  const isLoading = useAppSelector((state) => {
    return Object.values(state.api.queries).some((query) => {
      return query && query.status === QueryStatus.pending;
    });
  });
  return <div>{isLoading}</div>;
}
