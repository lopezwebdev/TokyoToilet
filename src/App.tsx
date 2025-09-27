import React from 'react';
import { ToiletMap } from './components/ToiletMap';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-800 py-6 sm:py-12 px-4" style={{background: 'linear-gradient(to bottom, #009944, #007a37, #009944)'}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-end mb-6">
            <LanguageToggle />
          </div>
          <div className="mb-6">
            <div className="inline-block border-2 border-white px-4 sm:px-8 py-3 mb-4 rounded-lg">
              <h1 className="text-xl sm:text-3xl font-light text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                {t('app.title')}
              </h1>
            </div>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-sm sm:text-base text-white font-light leading-relaxed max-w-xl mx-auto px-4">
              {t('app.subtitle')}
            </p>
          </div>
        </div>
        
        <ToiletMap />
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
