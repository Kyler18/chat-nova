"use client";

// This file defines a React component for editing chat titles. It uses the Radix UI library for UI components,
// Next.js for routing, and react-hot-toast for displaying toast notifications. The component fetches data from an API endpoint,
// and uses React's useState hook for managing component state.

// Import necessary modules and components
import { ENDPOINT } from "@/constants/endpoint"; // API endpoint
import { Button, Dialog, TextField } from "@radix-ui/themes"; // UI components
import { useRouter } from "next/navigation"; // Next.js router
import React, { ReactNode, useState } from "react"; // React and its hooks
import { toast } from "react-hot-toast"; // Toast notifications
import { ImSpinner2 } from "react-icons/im"; // Spinner icon
import { Pencil1Icon } from "@radix-ui/react-icons"; // Pencil icon

// Define the ChatEditDialog component
export const ChatEditDialog = ({
  chat,
  triggerComponent,
}: {
  chat: TChat; // Chat object
  triggerComponent: ReactNode; // Component that triggers the dialog
}) => {
  const router = useRouter(); // Next.js router instance
  const [loading, setLoading] = useState(false); // Loading state
  const [open, setOpen] = React.useState(false); // Dialog open state
  const [input, setInput] = useState(""); // Input state

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value.toLowerCase()); // Set input state to lowercased value
  };

  // Handle chat title update
  const handleDelete = async () => {
    setLoading(true); // Set loading state to true
    await fetch(`${ENDPOINT}/api/chat/${chat.id}`, { // Send PATCH request to API
      method: "PATCH",
      body: JSON.stringify({
        title: input.toLowerCase(), // Update title to lowercased input value
      }),
    }).then((res) => {
      if (res.ok) { // If response is OK
        setLoading(false); // Set loading state to false
        router.refresh(); // Refresh the page
        toast.success("Title was updated successfully"); // Show success toast
        setOpen(false); // Close the dialog
      } else { // If response is not OK
        setLoading(false); // Set loading state to false
        toast.error("Something went wrong"); // Show error toast
      }
    });
  };

  // Render the component
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}> // Dialog root
      <Dialog.Trigger>{triggerComponent}</Dialog.Trigger> // Dialog trigger

      <Dialog.Content style={{ maxWidth: 450, margin: 10, padding: 0 }}> // Dialog content
        <h1 className="p-5 text-xl border-b dark:border-zinc-700">
          Edit Chat Title
        </h1>
        <div className="p-5 pb-0">
          <TextField.Root
            onChange={handleChange} // Handle input change
            className="w-full"
            variant="soft"
            color="gray"
            size="3"
          >
            <TextField.Slot>
              <Pencil1Icon height="16" width="16" /> // Pencil icon
            </TextField.Slot>
            <TextField.Input
              value={input} // Input value
              placeholder={
                chat.title || `Conversation - ${chat.id.slice(0, 8)}` // Placeholder text
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
          <Button onClick={handleDelete} disabled={loading} size="3"> // Update button
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" /> // Spinner icon
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