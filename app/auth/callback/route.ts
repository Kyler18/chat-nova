// This file handles the authentication callback route for a Next.js application using Supabase.
// It retrieves the authorization code from the request URL and exchanges it for a session.
// If the code is valid, the user is redirected to the chat page.

import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// This constant is used to force dynamic routing in Next.js
export const dynamic = "force-dynamic";

// This is the GET request handler for the callback route
export async function GET(request: NextRequest) {
  // Parse the request URL
  const requestUrl = new URL(request.url);
  // Retrieve the authorization code from the URL parameters
  const code = requestUrl.searchParams.get("code");
  console.log(code)

  // If an authorization code is present
  if (code) {
    // Create a new Supabase client for handling the route
    const supabase = createRouteHandlerClient<Database>({ cookies });
    // Exchange the authorization code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect the user to the chat page
  return NextResponse.redirect(`${requestUrl.origin}/chat`);
}