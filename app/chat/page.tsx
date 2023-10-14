// This file defines the NewChat component which is used to create a new chat session.
// It uses Supabase for authentication and database operations.
// If the user is not authenticated, they are redirected to the home page.
// If the user is an admin, they are given the option to upload a PDF file.
// If the user is not an admin, they are informed that they do not have the required access to upload a PDF file.

import { ChatCreatorClient } from "@/components/chat"; // Importing the ChatCreatorClient component
import { UploadPDFButton } from "@/components/document/upload-button"; // Importing the UploadPDFButton component
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // Importing the createServerComponentClient function from Supabase
import { cookies } from "next/headers"; // Importing the cookies object from Next.js headers
import { redirect } from "next/navigation"; // Importing the redirect function from Next.js navigation

// The NewChat component
export default async function NewChat() {
  const supabase = createServerComponentClient<Database>({ cookies }); // Creating a Supabase client

  // Getting the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no session, redirect to the home page
  if (!session) {
    redirect("/");
  }

  // Fetching the user data from the 'users' table in the database
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

  // Rendering the component
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center max-w-lg gap-5 p-5 text-center">
        <h1 className="text-2xl font-bold">Welcome to the Chatbot</h1>
        {user?.role === "admin" ? (
          <>
            <p>
              You are an admin. You can upload a PDF file to the chatbot. You
              can use the below button to start uploading a PDF document
            </p>
            <div className="flex flex-wrap gap-2">
              <UploadPDFButton /> {/* The button for uploading a PDF file */}
              <div className="lg:hidden">
                <ChatCreatorClient /> {/* The chat creator client */}
              </div>
            </div>
          </>
        ) : (
          <>
            <p>
              You can start using the chatbot, right now you don't have the
              required access to upload a PDF file. Please contact the admin to
              get the access.
            </p>
            <div className="lg:hidden">
              <ChatCreatorClient /> {/* The chat creator client */}
            </div>
          </>
        )}
      </div>
    </main>
  );
}