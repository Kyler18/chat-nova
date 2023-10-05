import { ChatRenderClient } from "@/components/chat";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Chat({ params }: { params: { id: string[] } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", params.id);

  return (
    <>
      <ChatRenderClient defaultMessages={data} />
    </>
  );
}
