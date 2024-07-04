import { NextResponse } from "next/server";
import { findRelevantBook } from "@/app/utils/vectorSearch";

export async function POST(req: Request) {
  const body = await req.json();
  const { query } = body;

  try {
    const result = await findRelevantBook(query);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "An error occurred during the search." },
      { status: 500 }
    );
  }
}
