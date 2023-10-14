// This file is a Next.js page that renders a chat interface for a specific chat ID.
// It uses Supabase for data fetching and authentication, and a custom ChatRenderClient component for rendering the chat interface.

import { ChatRenderClient } from "@/components/chat"; // Importing the chat rendering component
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // Importing Supabase helper for server-side component
import { redirect } from "next/navigation"; // Importing Next.js navigation helper
import { cookies } from "next/headers"; // Importing Next.js headers helper

// The main function of this file, which is a Next.js page component.
// It fetches the chat messages for a specific chat ID from Supabase and passes them to the ChatRenderClient component.
export default async function Chat({ params }: { params: { id: string[] } }) {
  const supabase = createServerComponentClient<Database>({ cookies }); // Creating a Supabase client with the provided cookies

  // Fetching the chat messages for the provided chat ID from Supabase
  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", params.id);

  // Rendering the chat interface with the fetched messages
  return (
    <>
      <ChatRenderClient defaultMessages={data} />
    </>
  );
}