import OpenAI from "openai";
import { evaluateWithLLM } from "./evalutateWithLLM";
import { querySimilarVectors } from "./querySimilarVectors";
import { textToVector } from "./textToVector";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Page of book to vector
// convert query to vector
// vector to pinecone
// LLM to find the closest match

interface BookMetadata {
  title: string;
  isbn: string;
  pageNumber: number;
  pageText: string;
}

export async function findRelevantBook(query: string) {
  const queryVector = await textToVector(query);
  const similarResults = await querySimilarVectors(queryVector);
  const evaluation = await evaluateWithLLM(query, similarResults, openai);
  return evaluation;
}
