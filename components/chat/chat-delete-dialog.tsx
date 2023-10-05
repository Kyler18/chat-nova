"use client";

import { ENDPOINT } from "@/constants/endpoint";
import { Button, Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { toast } from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

export const ChatDeleteDialog = ({
  chat,
  triggerComponent,
}: {
  chat: TChat;
  triggerComponent: ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`${ENDPOINT}/api/chat/${chat.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setLoading(false);
        router.refresh();
        router.push("/chat");
        toast.success("Chat was deleted successfully");
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

      <Dialog.Content
        className="flex flex-col items-center text-center"
        style={{ maxWidth: 450, margin: 10 }}
      >
        <Dialog.Title size="6">Delete Chat</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this chat? You will not be able to
          undo this action.
        </Dialog.Description>
        <div className="flex gap-1 mt-4">
          <Dialog.Close>
            <Button disabled={loading} size="3" variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            onClick={handleDelete}
            disabled={loading}
            size="3"
            color="red"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Proceed to Delete"
            )}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
