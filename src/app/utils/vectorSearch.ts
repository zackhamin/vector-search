import axios from "axios";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface BookMetadata {
  title: string;
  isbn: string;
  pageNumber: number;
  pageText: string;
}

async function textToVector(text: string): Promise<number[]> {
  const response = await axios.post(
    "https://api.voyageai.com/v1/embeddings",
    {
      model: "voyage-01",
      input: text,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data[0].embedding;
}

async function querySimilarVectors(queryVector: number[], topK: number = 5) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
  const queryResponse = await index.query({
    vector: queryVector,
    topK: topK,
    includeMetadata: true,
  });

  return queryResponse.matches;
}

async function evaluateWithLLM(query: string, similarResults: any[]) {
  const prompt = `Query: "${query}"
Similar results:
${similarResults
  .map(
    (r) =>
      `- ${r.metadata.title}, Page ${r.metadata.pageNumber}: "${r.metadata.pageText}"`
  )
  .join("\n")}

Based on these results, which book and page is most relevant to the query?`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}

export async function findRelevantBook(query: string) {
  const queryVector = await textToVector(query);
  console.log(`Vectore is: ${queryVector}`);
  const similarResults = await querySimilarVectors(queryVector);
  console.log(`Querying Vector is: ${similarResults}`);
  const evaluation = await evaluateWithLLM(query, similarResults);
  return evaluation;
}
