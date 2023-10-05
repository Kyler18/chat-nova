import { ChatCreatorClient } from "@/components/chat";
import { UploadPDFButton } from "@/components/document/upload-button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewChat() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

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
              <UploadPDFButton />
              <div className="lg:hidden">
                <ChatCreatorClient />
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
              <ChatCreatorClient />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
