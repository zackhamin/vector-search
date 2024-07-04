"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred while searching.");
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Vector Search Demo</h1>
        <div className="flex space-x-4 mb-4">
          <Input
            type="text"
            placeholder="Enter your search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
        {result && (
          <div className="mt-8 p-4 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
