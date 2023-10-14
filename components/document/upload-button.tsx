// This file defines a React component for a PDF upload button.
// The button, when clicked, opens a file selection dialog.
// Once a file is selected, it is uploaded to the "/api/vector-upload" endpoint.

"use client";

import { useState, useRef } from "react";
import { Button } from "@radix-ui/themes";
import { PiUploadSimpleBold } from "react-icons/pi";

export function UploadPDFButton() {
  // State to hold the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Reference to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handler for file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Set the selected file
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    
    // If a file is selected, upload it
    if (event.target.files) {
      await handleUpload(event.target.files[0]);
    }
  };

  // Function to upload the file
  const handleUpload = async (file: File) => {
    // Send a POST request to the upload endpoint
    const response = await fetch("/api/vector-upload", {
      method: "POST",
      body: file,
    });
    
    // Log the result of the upload
    if (response.ok) {
      console.log("Upload successful");
    } else {
      console.error("Upload failed");
    }
  };

  // Handler for button click
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current?.click();
  };

  return (
    <div>
      // Render the upload button
      <Button onClick={handleButtonClick} size="3" variant="solid">
        <PiUploadSimpleBold />
        Upload PDF
      </Button>
      
      // Hidden file input element
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
    </div>
  );
}