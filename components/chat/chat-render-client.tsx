// This file defines the ChatRenderClient component which is responsible for rendering the chat interface.
// It uses the useChat hook to manage chat state and interactions, and it also handles the submission of messages to the server.
// The component also provides a mechanism to scroll to the latest message when a new message is added.

"use client";

// Importing necessary libraries and components
import { Button } from "@radix-ui/themes"; // Button component from Radix UI
import { useChat } from "ai/react"; // Custom hook for managing chat

// Importing icons for send button and loading spinner
import { BsSend } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

// Importing necessary hooks and constants
import { useEffect, useState } from "react";
import { ENDPOINT } from "@/constants/endpoint"; // API endpoint constant
import { useParams } from "next/navigation"; // Hook for accessing router params

// Importing chat related components
import { ChatMessage } from "./chat-message"; // Component for rendering individual chat message
import { ChatStarterClient } from "./chat-starter-client"; // Component for starting the chat
import { DocumentDialogClient } from "../document/document-dialog-client"; // Document dialog component

// ChatRenderClient component definition
export function ChatRenderClient({
  defaultMessages,
}: {
  defaultMessages: TMessage[] | null; // Prop for default messages
}) {
  const params = useParams(); // Getting router params
  const [inputOption, setInputOption] = useState<string>(
    "No Document"
  ); // State for input option

  // Using the useChat hook to manage chat state and interactions
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
      // Function to execute when a message is sent
      await fetch(`${ENDPOINT}/api/message/${params.id}`, {
        method: "POST",
        body: JSON.stringify({
          userMessage: input,
          assistantMessage: message.content,
        }),
      });
    },
  });

  // Effect for setting default messages
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

  // Effect for scrolling to the latest message
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Rendering the chat interface
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