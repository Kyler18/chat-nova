"use client";

import { ENDPOINT } from "@/constants/endpoint";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { ImSpinner4 } from "react-icons/im";

export const ChatCreatorClient = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    await fetch(`${ENDPOINT}/api/chat/create`, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        router.refresh();
        res.json().then((data: { data: TChat[] }) => {
          router.push(`/chat/${data.data[0].id}`);
        });
        toast.success("Chat created successfully");
        setLoading(false);
      }
    });
  };

  return (
    <Button
      size="3"
      variant="surface"
      color="gray"
      highContrast
      disabled={loading}
      onClick={handleCreate}
      className="flex justify-start w-full "
    >
      {loading ? <ImSpinner4 className="animate-spin" /> : <AiOutlinePlus />}
      New Chat
    </Button>
  );
};
