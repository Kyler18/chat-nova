// This file defines a React component for creating a new chat in a chat application.
// The component is a button that, when clicked, sends a POST request to the server to create a new chat.
// While the request is being processed, a loading spinner is displayed.
// Once the chat is created, the user is redirected to the new chat and a success message is displayed.

"use client";

// Importing necessary modules and components
import { ENDPOINT } from "@/constants/endpoint"; // API endpoint
import { Button } from "@radix-ui/themes"; // UI component library
import { useRouter } from "next/navigation"; // Hook for routing
import React, { useState } from "react"; // React and its state hook
import { toast } from "react-hot-toast"; // Toast notifications
import { AiOutlinePlus } from "react-icons/ai"; // Plus icon
import { ImSpinner4 } from "react-icons/im"; // Spinner icon

// ChatCreatorClient component
export const ChatCreatorClient = () => {
  const router = useRouter(); // Hook for routing
  const [loading, setLoading] = useState(false); // State for loading status

  // Function to handle chat creation
  const handleCreate = async () => {
    setLoading(true); // Set loading to true
    await fetch(`${ENDPOINT}/api/chat/create`, { // Send POST request to create chat
      method: "POST",
    }).then((res) => {
      if (res.ok) { // If response is OK
        router.refresh(); // Refresh the router
        res.json().then((data: { data: TChat[] }) => { // Parse response data
          router.push(`/chat/${data.data[0].id}`); // Redirect to new chat
        });
        toast.success("Chat created successfully"); // Show success message
        setLoading(false); // Set loading to false
      }
    });
  };

  // Render the button
  return (
    <Button
      size="3"
      variant="surface"
      color="gray"
      highContrast
      disabled={loading} // Disable button while loading
      onClick={handleCreate} // Set click handler
      className="flex justify-start w-full "
    >
      {loading ? <ImSpinner4 className="animate-spin" /> : <AiOutlinePlus />} // Show spinner or plus icon based on loading status
      New Chat
    </Button>
  );
};