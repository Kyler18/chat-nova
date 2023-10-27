// This file defines a React component named `ChatStarterClient`.
// The component is used to initiate a chat session with a selected document.
// It displays a list of documents (PDFDocuments) from which the user can select.
// The selected document's title is displayed at the top of the chat.
// The user is prompted to start the conversation by typing a message into an input box.

"use client";

import { Select, Separator } from "@radix-ui/themes";
import React from "react";
import { BsChatSquareText } from "react-icons/bs";
import { DocumentDialogClient } from "../document/document-dialog-client";
import { PDFDocuments } from "@/lib/pdf-documents";

export const ChatStarterClient = ({
  document,
  setDocument,
}: {
  document: string;
  setDocument: (doc: string) => void;
}) => {
  const title = PDFDocuments.filter((pdf) => pdf.value === document)[0].title;
  return (
    <div className="container flex flex-col items-center h-full py-5 space-y-5 text-center ">
      <BsChatSquareText className="text-5xl" />
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="flex flex-col text-3xl font-bold">
          <span>{title || "Start the conversation"}</span>
        </h1>
        <p className="max-w-xl">
          This chat is currently empty. Start the conversation with{" "}
          <strong>{title || "chatbot"}</strong> by typing something in the input
          box below and hit enter, or press the send button. The chatbot will
          respond to your message.
        </p>
        <Separator size="4" />
        <p className="font-bold">
          Make sure to select the document you want to chat with.
        </p>
        <div>
          <DocumentDialogClient document={document} setDocument={setDocument} />
        </div>
      </div>
    </div>
  );
};
