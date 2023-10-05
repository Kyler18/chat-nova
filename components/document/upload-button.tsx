"use client";

import { useState, useRef } from "react";
import { Button } from "@radix-ui/themes";
import { PiUploadSimpleBold } from "react-icons/pi";

export function UploadPDFButton() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    if (event.target.files) {
      await handleUpload(event.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    const response = await fetch("/api/vector-upload", {
      method: "POST",
      body: file,
    });
    if (response.ok) {
      console.log("Upload successful");
    } else {
      console.error("Upload failed");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Button onClick={handleButtonClick} size="3" variant="solid">
        <PiUploadSimpleBold />
        Upload PDF
      </Button>
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
