// This file defines a functional React component named `ChatMessage`.
// The `ChatMessage` component is responsible for rendering a single chat message.
// It takes a `message` object as a prop, which contains the content and role of the message.
// Depending on the role of the message (user or bot), it displays a different avatar.
// The message content is displayed in a `pre` tag with word wrapping enabled.

import { Avatar } from "@radix-ui/themes";
import { Message } from "ai";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

// `ChatMessage` component definition
export const ChatMessage = ({ message }: { message: Message }) => {
  return (
    // The outer div sets the background color based on the role of the message
    <div
      className={twMerge(
        message.role === "user"
          ? "bg-transparent"
          : "bg-gray-100 dark:bg-zinc-800",
        "py-5"
      )}
    >
      <div className="container flex items-start gap-2">
        {/* Depending on the role of the message, display a different avatar */}
        {message.role === "user" ? (
          <Avatar
            size="1"
            color="gray"
            variant="solid"
            fallback={<AiOutlineUser />}
          />
        ) : (
          <Avatar
            size="1"
            color="green"
            variant="solid"
            fallback={<RiRobot2Line />}
          />
        )}
        {/* Display the content of the message */}
        <pre className="font-sans" style={{ wordWrap: "break-word" }}>
          {message.content}
        </pre>
      </div>
    </div>
  );
};