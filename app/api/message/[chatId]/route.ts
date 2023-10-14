/**
 * This file defines the POST route handler for the `/api/message/[chatId]` endpoint.
 * It receives a chat message from a user and an assistant message, then inserts them into the 'messages' table in the database.
 * The user must be authenticated to perform this operation.
 */

// Importing necessary modules
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// The POST function handles the POST request to the `/api/message/[chatId]` endpoint
export async function POST(
  request: Request, // The incoming request object
  { params }: { params: { chatId: string } } // The parameters from the request URL
) {
  // Destructure the assistantMessage and userMessage from the request body
  const { assistantMessage, userMessage } = await request.json();

  // Create a Supabase client for handling database operations
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // Get the current session from the Supabase client
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no session, return an Unauthorized error
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Insert the user and assistant messages into the 'messages' table in the database
  const { data, error } = await supabase.from("messages").insert([
    {
      chat_id: params.chatId, // The chat ID from the request parameters
      content: userMessage, // The user message from the request body
      user_id: session.user.id, // The user ID from the session
      role: "user", // The role of the message sender
    },
    {
      chat_id: params.chatId, // The chat ID from the request parameters
      content: assistantMessage, // The assistant message from the request body
      user_id: session.user.id, // The user ID from the session
      role: "assistant", // The role of the message sender
    },
  ]);

  // Log any errors that occurred during the insert operation
  console.log(error);

  // Return a JSON response with no content
  return NextResponse.json({});
}