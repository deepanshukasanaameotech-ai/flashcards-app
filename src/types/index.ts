export interface Flashcard {
  id: string;
  front: string;
  back: string;
  tags: string[];
  difficulty: number;
  lastReviewed: number;
  nextReview: number;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  createdAt: number;
}



export interface Stats {
  totalCards: number;
  masteredCards: number;
  reviewsDue: number;
  accuracy: number;
  streak: number;
}
