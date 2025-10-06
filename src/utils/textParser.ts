import type { Flashcard } from "../types";

export function parseTextToFlashcards(text: string): Flashcard[] {
  try {
    // Try parsing JSON input
    const parsed = JSON.parse(text);

    // If it's already an array of flashcards
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        id: item.id || `card-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        front: item.front || "No question provided",
        back: item.back || "No answer provided",
        tags: item.tags || [],
        difficulty: item.difficulty ?? 2.5,
        lastReviewed: item.lastReviewed ?? 0,
        nextReview: item.nextReview ?? Date.now(),
        reviewCount: item.reviewCount ?? 0,
        correctCount: item.correctCount ?? 0,
        incorrectCount: item.incorrectCount ?? 0,
        createdAt: item.createdAt ?? Date.now(),
      }));
    }

    // If text isn't an array, handle gracefully
    return [];
  } catch (e) {
    console.error("Invalid JSON input:", e);
    return [];
  }
}
