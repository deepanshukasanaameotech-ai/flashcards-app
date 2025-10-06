import React, { useState } from 'react';
import type { Flashcard } from '../types';
import { Check, X, Play } from 'lucide-react';
import { calculateNextReview } from '../utils/spacedRepetition';

interface Props {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

export const ReviewTab: React.FC<Props> = ({ flashcards, setFlashcards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter cards for review
  const reviewCards = flashcards
    .filter(c => selectedTags.length === 0 || c.tags.some(t => selectedTags.includes(t)))
    .filter(c => c.nextReview <= Date.now())
    .sort((a, b) => a.nextReview - b.nextReview);

  const allTags = Array.from(new Set(flashcards.flatMap(c => c.tags)));

  if (reviewCards.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <Play className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No cards due for review!</h2>
        <p className="text-gray-600 dark:text-gray-400">Check back later or adjust your tags.</p>
      </div>
    );
  }

  const handleReview = (correct: boolean) => {
    const card = reviewCards[currentCardIndex];
    const { newDifficulty, interval } = calculateNextReview(card.difficulty, correct);
    const now = Date.now();

    const updatedCard: Flashcard = {
      ...card,
      difficulty: newDifficulty,
      lastReviewed: now,
      nextReview: now + interval,
      reviewCount: card.reviewCount + 1,
      correctCount: card.correctCount + (correct ? 1 : 0),
      incorrectCount: card.incorrectCount + (correct ? 0 : 1),
    };

    setFlashcards(flashcards.map(c => (c.id === card.id ? updatedCard : c)));
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentCardIndex(prev => Math.min(prev + 1, reviewCards.length - 1));
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentCardIndex(prev => Math.max(prev - 1, 0));
    setIsFlipped(false);
  };

  return (
    <div className="space-y-6">
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Filter by tags:</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]))
                }
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card Display */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-12 min-h-[400px] flex flex-col items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
      >
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            {isFlipped ? 'ANSWER' : 'QUESTION'}
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isFlipped ? reviewCards[currentCardIndex].back : reviewCards[currentCardIndex].front}
          </p>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-8">Click to flip</p>
      </div>

      {/* Knew / Didn't Know */}
      {isFlipped && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              handleReview(false);
              handleNext();
            }}
            className="flex items-center space-x-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Didn't Know</span>
          </button>
          <button
            onClick={() => {
              handleReview(true);
              handleNext();
            }}
            className="flex items-center space-x-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            <Check className="w-5 h-5" />
            <span>Knew It!</span>
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Card {currentCardIndex + 1} of {reviewCards.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentCardIndex === reviewCards.length - 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
