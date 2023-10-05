"use client";

import { Select, Separator } from "@radix-ui/themes";
import React from "react";
import { BsChatSquareText } from "react-icons/bs";
import { DocumentDialogClient } from "../document/document-dialog-client";

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

const PDFDocuments = [
  {
    value: "Filtered_BSC_Synergy_Operator_Guide_v1",
    title: "Synergy Operators Manual",
  },
  {
    value: "SM-001_SY3200 Series Service Manual_ Rev A 5FEB13",
    title: "Synergy Service Manual",
  },
  {
    value: "Attune™ NxT Software User Guide (Pub. No. 100024236 Rev. F)",
    title: "Attune User Guide",
  },
  {
    value: "IncuCyte S3 User Manual",
    title: "Incucyte User Guide",
  },
  {
    value: "ZE5 Cell Analyzer and Everest User Guide",
    title: "Yeti + Everest User Guide",
  },
  {
    value: "Common Cell Markers",
    title: "Common Cell Markers",
  },
  {
    value: "Cell Sorting FAQ",
    title: "Cell Sorting FAQ",
  },
  {
    value:
      "Cytek® Aurora cFluor Selection Guidelines 5 Laser 16UV-16V-14B-10YG-8R",
    title: "Aurora cFluor Selection Guidelines(5 Laser)",
  },
  {
    value: "Fluorochrome Testing  April 25 2018",
    title: "Aurora cFluor Selection Guidelines(3 Laser)",
  },
  {
    value: "N9-20077 Aurora CS 121621-review-2.pdf",
    title: "Aurora CS User Guide",
  },
  {
    value: "N9-20039US Northern Lights UG 012122.pdf",
    title: "Northern Lights User Guide",
  },
  {
    value: "N9-20006-E Aurora UG 11112022-ReviewDraft.pdf",
    title: "Aurora User Guide",
  },
  {
    value: "QRG 2_column.fm",
    title: "Aurora Quick Reference Guide",
  },
];
