"use client";

import { Button } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export function AuthButtonClient() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

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

export function AuthButtonSignOut() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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
