"use client";

import { ENDPOINT } from "@/constants/endpoint";
import { Button, Dialog, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { toast } from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { Pencil1Icon } from "@radix-ui/react-icons";

export const ChatEditDialog = ({
  chat,
  triggerComponent,
}: {
  chat: TChat;
  triggerComponent: ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value.toLowerCase());
  };

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`${ENDPOINT}/api/chat/${chat.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: input.toLowerCase(),
      }),
    }).then((res) => {
      if (res.ok) {
        setLoading(false);
        router.refresh();
        toast.success("Title was updated successfully");
        setOpen(false);
      } else {
        setLoading(false);
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{triggerComponent}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450, margin: 10, padding: 0 }}>
        <h1 className="p-5 text-xl border-b dark:border-zinc-700">
          Edit Chat Title
        </h1>
        <div className="p-5 pb-0">
          <TextField.Root
            onChange={handleChange}
            className="w-full"
            variant="soft"
            color="gray"
            size="3"
          >
            <TextField.Slot>
              <Pencil1Icon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              value={input}
              placeholder={
                chat.title || `Conversation - ${chat.id.slice(0, 8)}`
              }
            />
          </TextField.Root>
        </div>
        <div className="flex justify-end gap-1 p-5">
          <Dialog.Close>
            <Button disabled={loading} size="3" color="gray" variant="soft">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleDelete} disabled={loading} size="3">
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update Title"
            )}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
