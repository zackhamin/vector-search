export async function evaluateWithLLM(
  query: string,
  similarResults: any[],
  openai: any
) {
  console.log(similarResults);
  const prompt = `Query: "${query}"

  Similar results:
  ${similarResults
    .map((r) => `- ${r.metadata.title}, Page ${r.metadata.Page}"`)
    .join("\n")}
  You are a book reviewer and your job is to query the results and recommend the most 
  relevant book in a pleasant manner. Do not repeat the query back. Just talk about your recommendation`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
