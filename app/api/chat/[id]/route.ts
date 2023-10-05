import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data } = await supabase
    .from("chats")
    .delete()
    .match({ id: params.id });

  return NextResponse.json({ data });
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { title } = await req.json();

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data } = await supabase
    .from("chats")
    .update({ title: title })
    .eq("id", params.id)
    .select();

  return NextResponse.json({ data });
}
