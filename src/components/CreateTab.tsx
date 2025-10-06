import React, { useState } from 'react';
import type { Flashcard } from '../types';

interface CreateTabProps {
  onAddFlashcards: (newCards: Flashcard[]) => void;
}

export const CreateTab: React.FC<CreateTabProps> = ({ onAddFlashcards }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [tag, setTag] = useState('');
  const [jsonInput, setJsonInput] = useState('');

  // ✅ Add a single flashcard manually
  const handleAdd = () => {
    if (!front.trim() || !back.trim()) return;

    const timestamp = Date.now();
    const newCard: Flashcard = {
      id: timestamp.toString(),
      front: front.trim(),
      back: back.trim(),
      tags: tag ? [tag.trim()] : [],
      difficulty: 2.5,
      lastReviewed: 0,
      nextReview: timestamp,
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      createdAt: timestamp,
    };

    onAddFlashcards([newCard]);
    setFront('');
    setBack('');
    setTag('');
  };

  // ✅ Add flashcards from pasted JSON
  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) throw new Error();

      // Map each JSON object to a proper Flashcard type
      const newCards: Flashcard[] = parsed.map((card: any) => {
        const timestamp = Date.now() + Math.random(); // Ensure unique ID
        return {
          id: timestamp.toString(),
          front: card.front || '',
          back: card.back || '',
          tags: Array.isArray(card.tags) ? card.tags : [],
          difficulty: card.difficulty ?? 2.5,
          lastReviewed: card.lastReviewed ?? 0,
          nextReview: card.nextReview ?? timestamp,
          reviewCount: card.reviewCount ?? 0,
          correctCount: card.correctCount ?? 0,
          incorrectCount: card.incorrectCount ?? 0,
          createdAt: card.createdAt ?? timestamp,
        };
      });

      onAddFlashcards(newCards);
      setJsonInput('');
    } catch (err) {
      alert('Invalid JSON format. Make sure it is an array of flashcards.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Flashcards</h2>

      {/* Manual Add */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Add Flashcard</h3>
        <div className="space-y-3">
          <input
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Front (Question)"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Back (Answer)"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Tag (optional)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Add Flashcard
          </button>
        </div>
      </div>

      {/* JSON Import */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Import from JSON</h3>
        <textarea
          className="w-full p-3 h-40 border rounded-lg dark:bg-gray-700 dark:text-white"
          placeholder='Paste JSON here (e.g. [{"front":"Q","back":"A","tags":["tag"]}])'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button
          onClick={handleJsonImport}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Import JSON
        </button>
      </div>
    </div>
  );
};
