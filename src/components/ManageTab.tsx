import type { Flashcard } from "../types";
import { Edit2, Trash2, FileText } from "lucide-react";
import * as React from 'react';

interface Props {
  flashcards: Flashcard[];
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
}

export const ManageTab = ({ flashcards, setFlashcards }: Props) => {
  const [editingCard, setEditingCard] = React.useState<Flashcard | null>(null);

  const deleteCard = (id: string) => {
    setFlashcards(flashcards.filter(c => c.id !== id));
  };

  const updateCard = (updated: Flashcard) => {
    setFlashcards(flashcards.map(c => c.id === updated.id ? updated : c));
    setEditingCard(null);
  };

  const addTagToCard = (cardId: string, tag: string) => {
    setFlashcards(flashcards.map(c =>
      c.id === cardId ? { ...c, tags: [...c.tags, tag] } : c
    ));
  };

  const exportFlashcards = () => {
    const data = JSON.stringify(flashcards, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashlearn-export.json';
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Flashcards ({flashcards.length})</h2>
        <button
          onClick={exportFlashcards}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {flashcards.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No flashcards yet. Create some to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {flashcards.map(card => (
            <div key={card.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {editingCard?.id === card.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingCard.front}
                    onChange={e => setEditingCard({ ...editingCard, front: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Front"
                  />
                  <textarea
                    value={editingCard.back}
                    onChange={e => setEditingCard({ ...editingCard, back: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Back"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateCard(editingCard)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCard(null)}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{card.front}</p>
                      <p className="text-gray-600 dark:text-gray-400">{card.back}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCard(card)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      <button
                        onClick={() => {
                          const tag = prompt('Enter tag:');
                          if (tag) addTagToCard(card.id, tag);
                        }}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        + Add Tag
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Difficulty: {card.difficulty.toFixed(1)} | Reviews: {card.reviewCount}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
