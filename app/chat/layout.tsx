// This file defines the layout for the chat application. It fetches the user's chat history from the database,
// and displays it using the HistoryPanel and HistorySidebar components. If the user is not authenticated, they are redirected to the home page.

import { HistoryPanel } from "@/components/history/history-panel"; // Importing the HistoryPanel component
import { HistorySidebar } from "@/components/history/history-sidebar"; // Importing the HistorySidebar component
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // Importing the function to create a Supabase client
import { redirect } from "next/navigation"; // Importing the function to handle redirections
import { cookies } from "next/headers"; // Importing the cookies from Next.js headers

export const dynamic = "force-dynamic"; // Exporting a constant string

// This is the main layout component for the chat application
export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode; // The children prop is expected to be a React node
}) {
  const supabase = createServerComponentClient<Database>({ cookies }); // Creating a Supabase client with the cookies

  // Fetching the current session from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no session, redirect to the home page
  if (!session) redirect("/");

  // Fetching the chat history for the current user from the database
  const { data } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  // Rendering the layout with the chat history and the children components
  return (
    <main className="lg:items-start lg:flex">
      <HistoryPanel session={session} chats={data} /> // Displaying the chat history in the HistoryPanel
      <HistorySidebar session={session} chats={data} /> // Displaying the chat history in the HistorySidebar
      <div className="relative w-full min-h-screen">{children}</div> // Rendering the children components
    </main>
  );
}