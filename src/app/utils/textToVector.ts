import axios from "axios";

export async function textToVector(text: string): Promise<number[]> {
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
