import type { Flashcard } from "../types";
import { BookOpen, Check, Play, BarChart3 } from "lucide-react";

interface Props {
  flashcards: Flashcard[];
}

export const StatsTab = ({ flashcards }: Props) => {
  const totalCards = flashcards.length;
  const masteredCards = flashcards.filter(c => c.difficulty >= 4.5).length;
  const reviewsDue = flashcards.filter(c => c.nextReview <= Date.now()).length;
  const accuracy = totalCards > 0
    ? Math.round(
        (flashcards.reduce((sum, c) => sum + c.correctCount, 0) /
         Math.max(1, flashcards.reduce((sum, c) => sum + c.reviewCount, 0))) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Cards', value: totalCards, icon: BookOpen, color: 'text-indigo-500' },
          { label: 'Mastered', value: masteredCards, icon: Check, color: 'text-green-500' },
          { label: 'Due for Review', value: reviewsDue, icon: Play, color: 'text-blue-500' },
          { label: 'Accuracy', value: `${accuracy}%`, icon: BarChart3, color: 'text-purple-500' }
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`w-12 h-12 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
