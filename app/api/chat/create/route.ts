import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data, error } = await supabase
      .from("chats")
      .insert({
        user_id: session.user.id,
      })
      .select();

    console.log(error);

    return NextResponse.json({ data });
  }
  return NextResponse.json({});
}

