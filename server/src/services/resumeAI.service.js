import OpenAI from "openai";

const getClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export const normalizeResume = async (rawText, parsedData) => {
  try {
    const client = getClient();

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are a resume parser.

Return ONLY valid JSON:
{
  "skills": [],
  "experience": [],
  "projects": [],
  "education": []
}

Do not hallucinate data.
          `,
        },
        {
          role: "user",
          content: rawText,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error("AI FAILED:", err.message);

    return parsedData; // fallback
  }
};