import React from "react";
import { HistoryRenderer } from "./history-renderer";
import { Session } from "@supabase/auth-helpers-nextjs";

export const HistoryPanel = ({
  session,
  chats,
}: {
  session: Session;
  chats: TChat[] | null;
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
