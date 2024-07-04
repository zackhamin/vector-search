import { Pinecone } from "@pinecone-database/pinecone";

export async function querySimilarVectors(
  queryVector: number[],
  topK: number = 5
) {
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
