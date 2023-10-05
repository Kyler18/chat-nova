"use client";

import { Button } from "@radix-ui/themes";
import { useChat } from "ai/react";

import { BsSend } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useEffect, useState } from "react";
import { ENDPOINT } from "@/constants/endpoint";
import { useParams } from "next/navigation";
import { ChatMessage } from "./chat-message";
import { ChatStarterClient } from "./chat-starter-client";
import { DocumentDialogClient } from "../document/document-dialog-client";

export function ChatRenderClient({
  defaultMessages,
}: {
  defaultMessages: TMessage[] | null;
}) {
  const params = useParams();
  const [inputOption, setInputOption] = useState<string>(
    "N9-20077 Aurora CS 121621-review-2.pdf"
  );

  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setMessages,
  } = useChat({
    body: {
      selectedOption: inputOption,
    },
    onFinish: async (message) => {
      await fetch(`${ENDPOINT}/api/message/${params.id}`, {
        method: "POST",
        body: JSON.stringify({
          userMessage: input,
          assistantMessage: message.content,
        }),
      });
    },
  });

  useEffect(() => {
    if (defaultMessages) {
      setMessages(
        defaultMessages.map((m) => ({
          content: m.content,
          id: m.id,
          role: m.role === "user" ? "user" : "assistant",
        }))
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <div>
        {messages.length > 0 ? (
          messages.map((m) => <ChatMessage message={m} key={m.id} />)
        ) : (
          <ChatStarterClient
            document={inputOption}
            setDocument={setInputOption}
          />
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 py-5 bg-white border-t border-gray-300 dark:bg-zinc-900 dark:border-t-zinc-700"
      >
        <div className="container flex gap-2 ">
          <input
            className="w-full p-2 border border-gray-300 rounded shadow-xl dark:placeholder:text-zinc-400 dark:bg-zinc-800 dark:border-none"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button className="shadow-xl" size="3" disabled={isLoading}>
            {isLoading ? <ImSpinner2 className="animate-spin" /> : <BsSend />}
          </Button>
        </div>
      </form>
    </div>
  );
}
