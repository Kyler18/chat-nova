// This file contains two React components: AuthButtonClient and AuthButtonSignOut.
// These components are used for handling user authentication in the application.
// AuthButtonClient is responsible for initiating the sign-in process with Google OAuth.
// AuthButtonSignOut is responsible for handling the sign-out process.

"use client";

import { Button } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

// AuthButtonClient component
export function AuthButtonClient() {
  // Create a Supabase client
  const supabase = createClientComponentClient<Database>();

  // Handle sign-in process
  const handleSignIn = async () => {
    // Initiate sign-in with Google OAuth
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  // Render a button for initiating the sign-in process
  return (
    <Button
      variant="solid"
      size="3"
      color="gray"
      highContrast
      onClick={handleSignIn}
    >
      Login with Google
    </Button>
  );
}

// AuthButtonSignOut component
export function AuthButtonSignOut() {
  // Create a Supabase client
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // Handle sign-out process
  const handleSignOut = async () => {
    // Initiate sign-out
    await supabase.auth.signOut();
    // Refresh the page after sign-out
    router.refresh();
  };

  // Render a button for initiating the sign-out process
  return (
    <button
      className="text-red-500 dark:text-red-400 dark:hover:text-white hover:text-black"
      color="red"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}