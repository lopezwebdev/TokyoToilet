import React from 'react';
import { ToiletMap } from './components/ToiletMap';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 via-green-700 to-green-800 py-6 sm:py-12 px-4" style={{ background: 'linear-gradient(to bottom, #009944, #007a37, #009944)' }}>
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

        <footer className="mt-12 py-8 text-center text-white/50 text-xs font-light max-w-2xl mx-auto space-y-4 border-t border-white/20 pt-8">
          <p>
            {t('app.disclaimer.independent')}
          </p>
          <p>
            THE TOKYO TOILET is a project by The Nippon Foundation. For official information, please visit <a href="https://tokyotoilet.jp/en/" target="_blank" rel="noreferrer" className="text-white hover:underline decoration-1 underline-offset-4">tokyotoilet.jp</a> or <a href="https://en.nippon-foundation.or.jp/what/projects/communities/thetokyotoilet" target="_blank" rel="noreferrer" className="text-white hover:underline decoration-1 underline-offset-4">nippon-foundation.or.jp</a>.
          </p>
          <p>
            © {new Date().getFullYear()} Tokyo Toilet Explorer. Built with ❤️ for architecture lovers.
          </p>
        </footer>
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
