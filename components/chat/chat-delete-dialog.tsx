// This file defines a React component for a dialog box that allows users to delete a chat.
// The dialog box is triggered by a component passed as a prop (triggerComponent).
// When the delete button is clicked, a DELETE request is sent to the server.
// If the request is successful, the user is redirected to the chat page and a success message is displayed.
// If the request fails, an error message is displayed.

"use client";

import { ENDPOINT } from "@/constants/endpoint"; // Importing the server endpoint
import { Button, Dialog } from "@radix-ui/themes"; // UI components from Radix UI
import { useRouter } from "next/navigation"; // Hook for routing
import React, { ReactNode, useState } from "react"; // React and its hooks
import { toast } from "react-hot-toast"; // Toast notifications
import { ImSpinner2 } from "react-icons/im"; // Spinner icon for loading state

// ChatDeleteDialog component
export const ChatDeleteDialog = ({
  chat,
  triggerComponent,
}: {
  chat: TChat; // Chat object to be deleted
  triggerComponent: ReactNode; // Component that triggers the dialog
}) => {
  const router = useRouter(); // Router hook
  const [loading, setLoading] = useState(false); // State for loading
  const [open, setOpen] = React.useState(false); // State for dialog open/close

  // Function to handle chat deletion
  const handleDelete = async () => {
    setLoading(true); // Set loading state to true
    await fetch(`${ENDPOINT}/api/chat/${chat.id}`, {
      method: "DELETE", // DELETE request
    }).then((res) => {
      if (res.ok) { // If request is successful
        setLoading(false); // Set loading state to false
        router.refresh(); // Refresh the page
        router.push("/chat"); // Redirect to chat page
        toast.success("Chat was deleted successfully"); // Show success message
        setOpen(false); // Close the dialog
      } else { // If request fails
        setLoading(false); // Set loading state to false
        toast.error("Something went wrong"); // Show error message
      }
    });
  };

  // Render the dialog
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
            onClick={handleDelete} // Call handleDelete on click
            disabled={loading} // Disable button while loading
            size="3"
            color="red"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin" /> {/* Spinner icon */}
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