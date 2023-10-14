// This component is responsible for rendering the chat history in a chat application.
// It displays a list of chats, each with a link to the chat's page, and options to delete or edit the chat if it's the active chat.
// It also displays the current user's avatar and email, with a sign out button.

"use client";

import { Avatar, Button, ScrollArea } from "@radix-ui/themes";
import { Session } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { AuthButtonSignOut } from "../auth/auth-button-client";
import { ChatCreatorClient } from "../chat";
import Link from "next/link";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ChatDeleteDialog } from "../chat/chat-delete-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { ChatEditDialog } from "../chat/chat-edit-dialog";
import { BsPen } from "react-icons/bs";
import { ThemeToggle } from "../theme-toggle";

// The HistoryRenderer component takes a session and a list of chats as props.
export const HistoryRenderer = ({
  session,
  chats,
}: {
  session: Session;
  chats: TChat[] | null;
}) => {
  // useParams is used to get the id of the current chat from the URL.
  const params = useParams();

  return (
    // The component is structured as a flex container with three main sections: the chat creator and theme toggle, the chat list, and the user info and sign out button.
    <div className="flex flex-col justify-between w-full h-full gap-2 ">
      <div className="flex w-full gap-1 p-5 pb-0">
        <div className="w-full">
          <ChatCreatorClient />
        </div>
        <ThemeToggle />
      </div>
      {chats && (
        <ScrollArea
          type="hover"
          className="relative"
          scrollbars="vertical"
          style={{ height: 410 }}
        >
          <ul className="py-10 text-sm">
            {chats.map((chat) => {
              const isActive = chat.id === params.id;
              return (
                <li
                  key={chat.id}
                  className="relative border-b dark:border-b-zinc-800 last-of-type:border-none"
                >
                  <Link
                    href={`/chat/${chat.id}`}
                    className={twMerge(
                      "flex justify-between gap-2 items-center px-5 py-4",
                      isActive
                        ? "bg-gray-100 dark:bg-zinc-800"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    <div className="flex gap-1 capitalize">
                      {chat.title ? (
                        <span>{chat.title.slice(0, 35)}</span>
                      ) : (
                        <>
                          <span>Conversation - </span>
                          <span>{chat.id.slice(0, 8)}</span>
                        </>
                      )}
                    </div>
                    {isActive ? (
                      <div
                        className={twMerge(
                          "bg-gradient-to-l from-white to-transparent via-white dark:from-zinc-800 dark:via-zinc-800 dark:to-transparent",
                          "absolute  top-0 bottom-0 right-0 flex p-5 items-center justify-end gap-3 w-[120px]"
                        )}
                      >
                        <ChatDeleteDialog
                          chat={chat}
                          triggerComponent={
                            <Button size="2" variant="ghost" color="gray">
                              <AiOutlineDelete className="text-base" />
                            </Button>
                          }
                        />
                        <ChatEditDialog
                          chat={chat}
                          triggerComponent={
                            <Button size="2" variant="ghost" color="gray">
                              <BsPen className="text-sm" />
                            </Button>
                          }
                        />
                      </div>
                    ) : (
                      <div
                        className={twMerge(
                          "bg-gradient-to-l from-white to-transparent via-white dark:from-zinc-900 dark:via-zinc-900 dark:to-transparent",
                          "absolute  top-0 bottom-0 right-0 flex p-5 items-center justify-end gap-2 w-[120px]"
                        )}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      )}
      <div className="flex items-center gap-2 p-5">
        <Link href="/">
          <Avatar
            src={session.user?.user_metadata?.avatar_url || ""}
            variant="solid"
            color="gray"
            size="4"
            fallback={session.user.email?.slice(0, 2) || "U"}
          />
        </Link>
        <div className="flex flex-col items-start">
          <Link
            href="/chat"
            className="w-full truncate max-w-[180px] overflow-hidden"
          >
            {session.user.email}
          </Link>
          <AuthButtonSignOut />
        </div>
      </div>
    </div>
  );
};