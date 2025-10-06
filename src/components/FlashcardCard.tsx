import type { Flashcard } from "../types";
import { Edit2, Trash2 } from "lucide-react";

interface Props {
  card: Flashcard;
  editingCard: Flashcard | null;
  setEditingCard: (card: Flashcard | null) => void;
  deleteCard: (id: string) => void;
  addTagToCard: (id: string, tag: string) => void;
}

export const FlashcardCard = ({ card, editingCard, setEditingCard, deleteCard, addTagToCard }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {editingCard?.id === card.id ? (
        <div>Edit Mode Here</div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{card.front}</p>
              <p className="text-gray-600 dark:text-gray-400">{card.back}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setEditingCard(card)} className="p-2 text-blue-600 rounded">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteCard(card.id)} className="p-2 text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-2">
              {card.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs rounded-full">{tag}</span>
              ))}
              <button
                onClick={() => {
                  const tag = prompt('Enter tag:');
                  if (tag) addTagToCard(card.id, tag);
                }}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
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
  );
};
