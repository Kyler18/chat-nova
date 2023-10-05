import { HistoryPanel } from "@/components/history/history-panel";
import { HistorySidebar } from "@/components/history/history-sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/");

  const { data } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="lg:items-start lg:flex">
      <HistoryPanel session={session} chats={data} />
      <HistorySidebar session={session} chats={data} />
      <div className="relative w-full min-h-screen">{children}</div>
    </main>
  );
}
