/**
 * This file contains the route handler for creating a chat in the API.
 * 
 * It imports the necessary dependencies and defines the POST function to handle the request.
 * 
 * The POST function uses Supabase to insert a new chat into the "chats" table.
 * 
 * It first retrieves the session data using Supabase's auth.getSession() method.
 * 
 * If a session exists, it inserts a new chat record with the user_id from the session.
 * 
 * Finally, it returns a JSON response with the inserted chat data.
 * 
 * If no session exists, it returns an empty JSON response.
 */

// Importing necessary dependencies
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// POST function to handle the request
export async function POST(request: Request) {
  // Creating a Supabase client
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // Retrieving the session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If a session exists, insert a new chat record
  if (session) {
    const { data, error } = await supabase
      .from("chats")
      .insert({
        user_id: session.user.id,
      })
      .select();

    // Log any errors
    console.log(error);

    // Return a JSON response with the inserted chat data
    return NextResponse.json({ data });
  }
  // If no session exists, return an empty JSON response
  return NextResponse.json({});
}