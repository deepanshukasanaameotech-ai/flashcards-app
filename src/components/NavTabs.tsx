import { Play, Plus, FileText, BarChart3 } from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NavTabs = ({ activeTab, setActiveTab }: Props) => {
  const tabs = [
    { id: 'create', label: 'Create', icon: Plus },
    { id: 'review', label: 'Review', icon: Play },
    { id: 'manage', label: 'Manage', icon: FileText },
    { id: 'stats', label: 'Stats', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
