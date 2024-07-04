"use client";

import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [pageText, setPageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/upload", {
        title,
        isbn,
        pageNumber,
        pageText,
      });
      setMessage("Successfully uploaded and stored the vector!");
      console.log(response.data);
    } catch (error) {
      setMessage(
        `Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN:
          </label>
          <Input
            id="isbn"
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="pageText"
            className="block text-sm font-medium text-gray-700"
          >
            Page Text:
          </label>
          <Textarea
            id="pageText"
            value={pageText}
            onChange={(e) => setPageText(e.target.value)}
            required
            className="mt-1"
            rows={5}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Upload"}
        </Button>
      </form>
      {message && (
        <Alert className="mt-4">
          <AlertTitle>
            {message.startsWith("Error") ? "Error" : "Success"}
          </AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UploadPage;
