import { useState, useEffect } from 'react';
import { BookOpen, Plus, Play, FileText, BarChart3, Moon, Sun } from 'lucide-react';
import type { Flashcard } from './types';
import { CreateTab } from './components/CreateTab';
import { ReviewTab } from './components/ReviewTab';
import { ManageTab } from './components/ManageTab';
import { StatsTab } from './components/StatsTab';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'review' | 'manage' | 'stats'>('create');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  // Load flashcards from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('flashlearn-cards');
    if (stored) {
      try {
        setFlashcards(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load flashcards', e);
      }
    }
  }, []);

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashlearn-cards', JSON.stringify(flashcards));
  }, [flashcards]);

  // ✅ Handler to add new flashcards (merges with existing ones)
  const handleAddFlashcards = (newCards: Flashcard[]) => {
    setFlashcards((prev) => [...prev, ...newCards]);
  };

  const tabs = [
    { id: 'create', label: 'Create', icon: Plus },
    { id: 'review', label: 'Review', icon: Play },
    { id: 'manage', label: 'Manage', icon: FileText },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FlashLearn</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'create' && <CreateTab onAddFlashcards={handleAddFlashcards} />}
          {activeTab === 'review' && <ReviewTab flashcards={flashcards} setFlashcards={setFlashcards} />}
          {activeTab === 'manage' && <ManageTab flashcards={flashcards} setFlashcards={setFlashcards} />}
          {activeTab === 'stats' && <StatsTab flashcards={flashcards} />}
        </main>
      </div>
    </div>
  );
};

export default App;
