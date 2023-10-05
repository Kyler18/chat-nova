import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthButtonClient } from "@/components/auth/auth-button-client";

export const dynamic = "force-dynamic";

export default async function Chat() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/chat/create");
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center max-w-xl gap-5 p-10 text-center border rounded-xl dark:border-zinc-700">
        <h1 className="text-2xl font-bold">Welcome to the Chatbot</h1>
        <p>
          In order to use the chatbot, you need to sign in. Please click the
          button below to sign in with your Microsoft account.
        </p>
        <AuthButtonClient />
      </div>
    </main>
  );
}
