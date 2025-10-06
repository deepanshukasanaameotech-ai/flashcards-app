// /utils/aiFlashcards.ts


interface AIFlashcard {
  front: string;
  back: string;
  tags?: string[];
}

/**
 * Generates flashcards using OpenAI API.
 * @param text - The input text to generate flashcards from
 * @returns Promise<Flashcard[]> - Array of generated flashcards
 */
export async function generateFlashcardsAI(text: string): Promise<AIFlashcard[]> {
  if (!text.trim()) return [];

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is missing. Set VITE_OPENAI_API_KEY in your .env");
  }

  // Prepare the prompt for the AI
  const prompt = `
  Extract key points from the following text and create flashcards in JSON format.
  Each flashcard should have "front" (question) and "back" (answer) fields.
  Output ONLY a JSON array.

  Text:
  ${text}
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    const content = data.choices?.[0]?.message?.content;

    if (!content) return [];

    // Try to parse JSON safely
    let parsed: AIFlashcard[] = [];
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.warn("Failed to parse AI response as JSON:", content);
      return [];
    }

    return parsed;
  } catch (err) {
    console.error("AI flashcard generation failed:", err);
    return [];
  }
}
