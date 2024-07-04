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
  
  Based on these results, which book is most relevant to the query?`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
