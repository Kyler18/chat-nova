import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Dialog, ScrollArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { VscSearchStop } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import { PDFDocuments } from "@/lib/pdf-documents";

export const DocumentDialogClient = ({
  document,
  setDocument,
}: {
  document: string;
  setDocument: (doc: string) => void;
}) => {
  const [docs, setDocs] = useState(PDFDocuments);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setDocs(PDFDocuments);
    } else {
      setDocs(
        PDFDocuments.filter((pdf) =>
          pdf.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button size="3">Select document</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450, padding: 0 }}>
        <div className="p-5 border-b shadow-md dark:border-b-zinc-700 dark:shadow-2xl">
          <TextField.Root
            onChange={handleChange}
            variant="soft"
            color="gray"
            size="3"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input value={input} placeholder="Search the docs…" />
          </TextField.Root>
        </div>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 300 }}>
          {docs.length > 0 ? (
            <ul>
              {docs.map((pdf) => {
                const isActive = pdf.value === document;
                return (
                  <li
                    key={pdf.value}
                    className="border-b dark:border-b-zinc-700 last-of-type:border-none"
                    value={pdf.value}
                  >
                    <button
                      className={twMerge(
                        "flex w-full items-center justify-between p-5 dark:hover:bg-zinc-800 hover:bg-gray-100 transition-all",
                        isActive && "bg-gray-100 dark:bg-zinc-800"
                      )}
                      onClick={() => {
                        setDocument(pdf.value);
                        setOpen(false);
                        toast.success("Document is changed");
                      }}
                    >
                      <span>{pdf.title}</span>
                      {isActive && (
                        <IoCheckmarkSharp className="text-xl text-green-500 dark:text-green-300" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="flex flex-col items-center gap-2 p-5 text-center">
              <VscSearchStop className="text-3xl" />
              There were no results for your search
            </p>
          )}
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  );
};

