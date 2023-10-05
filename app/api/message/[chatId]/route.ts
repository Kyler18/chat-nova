import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  const { assistantMessage, userMessage } = await request.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase.from("messages").insert([
    {
      chat_id: params.chatId,
      content: userMessage,
      user_id: session.user.id,
      role: "user",
    },
    {
      chat_id: params.chatId,
      content: assistantMessage,
      user_id: session.user.id,
      role: "assistant",
    },
  ]);

  console.log(error);

  return NextResponse.json({});
}
