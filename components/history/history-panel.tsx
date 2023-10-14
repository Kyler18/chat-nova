// This file defines the HistoryPanel component which is used to display a history of chats.
// It uses the HistoryRenderer component to render the chat history.
// The component takes in two props: 'session' and 'chats'.
// 'session' is of type Session from the "@supabase/auth-helpers-nextjs" package.
// 'chats' is an array of TChat objects or null.

import React from "react";
import { HistoryRenderer } from "./history-renderer"; // Importing the HistoryRenderer component
import { Session } from "@supabase/auth-helpers-nextjs"; // Importing the Session type from Supabase auth helpers

// HistoryPanel component definition
export const HistoryPanel = ({
  session, // The current user's session
  chats, // The chat history
}: {
  session: Session; // Prop type definition
  chats: TChat[] | null; // Prop type definition
}) => {
  return (
    <aside
      className={
        "hidden lg:flex space-y-5 sticky h-screen top-0 w-[22rem]  border-r border-gray-300 dark:border-zinc-700"
      }
    >
      <HistoryRenderer chats={chats} session={session} />
    </aside>
  );
};