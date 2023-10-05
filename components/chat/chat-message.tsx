import { Avatar } from "@radix-ui/themes";
import { Message } from "ai";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

export const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div
      className={twMerge(
        message.role === "user"
          ? "bg-transparent"
          : "bg-gray-100 dark:bg-zinc-800",
        "py-5"
      )}
    >
      <div className="container flex items-start gap-2">
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
        <pre className="font-sans" style={{ wordWrap: "break-word" }}>
          {message.content}
        </pre>
      </div>
    </div>
  );
};
