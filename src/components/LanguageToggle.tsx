import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLanguageSelect = (lang: 'en' | 'ja') => {
    setLanguage(lang);
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      {!isExpanded ? (
        <button
          onClick={handleToggleExpand}
          className="flex items-center justify-center w-10 h-10 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
        >
          <Languages className="w-4 h-4 text-white" />
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg p-2">
          <button
            onClick={handleToggleExpand}
            className="flex items-center justify-center w-6 h-6 hover:bg-white/10 rounded transition-colors"
          >
            <Languages className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => handleLanguageSelect('en')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              language === 'en'
                ? 'bg-white text-slate-900 font-medium'
                : 'text-white hover:bg-white/10'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageSelect('ja')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              language === 'ja'
                ? 'bg-white text-slate-900 font-medium'
                : 'text-white hover:bg-white/10'
            }`}
          >
            日本語
          </button>
        </div>
      )}
    </div>
  );
};