import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This file is a part of the API routes for the chat feature in the application.
// It provides handlers for HTTP DELETE and PATCH requests for a specific chat identified by its ID.
// The DELETE handler deletes a chat from the "chats" table in the database.
// The PATCH handler updates the title of a chat in the "chats" table.

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
  ) {
    // Create a Supabase client with the necessary cookies
    const supabase = createRouteHandlerClient<Database>({ cookies });
  
    // Perform the delete operation and store the result
    const { data } = await supabase
      .from("chats")
      .delete()
      .match({ id: params.id });
  
    // Return the result of the operation as a JSON response
    return NextResponse.json({ data });
  }
  
  // PATCH handler: Updates the title of a chat in the "chats" table based on the provided ID
  export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    // Extract the new title from the request body
    const { title } = await req.json();
  
    // Create a Supabase client with the necessary cookies
    const supabase = createRouteHandlerClient<Database>({ cookies });
  
    // Perform the update operation and store the result
    const { data } = await supabase
      .from("chats")
      .update({ title: title })
      .eq("id", params.id)
      .select();
  
    // Return the result of the operation as a JSON response
    return NextResponse.json({ data });
  }