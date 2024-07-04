import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { textToVector } from "@/app/utils/textToVector";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function POST(request: Request) {
  const { title, isbn, pageText } = await request.json();

  if (!title || !isbn || !pageText) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Generate vector from page text
    const vector = await textToVector(pageText);

    // Store in Pinecone
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    await index.upsert([
      {
        id: `${isbn}`,
        values: vector,
        metadata: { title, isbn, Page: pageText },
      },
    ]);

    return NextResponse.json(
      { message: "Successfully uploaded and stored the vector" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { message: "Error processing upload" },
      { status: 500 }
    );
  }
}
