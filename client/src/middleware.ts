import { NextResponse, type NextRequest } from "next/server";
import { store } from "./redux/store";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const stores = store.getState();

  // rewrite to render log in component if not signed in
  if (request.nextUrl.pathname.startsWith("/private") && !stores.auth.token) {
    return NextResponse.rewrite(new URL("/signIn", request.url));
  }
}
