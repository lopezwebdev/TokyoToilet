import React from 'react';
import { CheckCircle, Camera, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProgressCelebrationProps {
  locationName: string;
  architect: string;
  completedCount: number;
  totalCount: number;
  onClose: () => void;
}

export const ProgressCelebration: React.FC<ProgressCelebrationProps> = ({
  locationName,
  architect,
  completedCount,
  totalCount,
  onClose
}) => {
  const { t } = useLanguage();
  const progressPercentage = Math.round((completedCount / totalCount) * 100);
  
  const getProgressMessage = () => {
    if (completedCount === totalCount) {
      return t('progress.complete');
    } else if (completedCount >= totalCount * 0.75) {
      return t('progress.nearlyThere');
    } else if (completedCount >= totalCount * 0.5) {
      return t('progress.halfway');
    } else if (completedCount >= totalCount * 0.25) {
      return t('progress.deepening');
    } else {
      return t('progress.begun');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border border-amber-200/30 max-w-md w-full p-8 text-center relative overflow-hidden">
        {/* Sparkle effects */}
        <div className="absolute top-4 left-4">
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
        </div>
        <div className="absolute top-6 right-6">
          <Sparkles className="w-3 h-3 text-amber-300 animate-pulse delay-300" />
        </div>
        <div className="absolute bottom-8 left-6">
          <Sparkles className="w-3 h-3 text-amber-200 animate-pulse delay-700" />
        </div>

        {/* Success icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-amber-200/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-amber-200" />
          </div>
          <h2 className="text-2xl font-light text-amber-100 tracking-wide mb-2">
            {t('progress.locationCaptured')}
          </h2>
        </div>

        {/* Location details */}
        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-amber-200" />
            <h3 className="font-light text-slate-200 tracking-wide">{locationName}</h3>
          </div>
          <p className="text-sm text-amber-200 italic">by {architect}</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-slate-400">
            <Camera className="w-4 h-4" />
            <span className="text-xs">{t('progress.documented')}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">{t('progress.progress')}</span>
            <span className="text-sm text-amber-200 font-medium">{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
            <div 
              className="bg-gradient-to-r from-amber-200 to-amber-300 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            {getProgressMessage()}
          </p>
        </div>

        {/* Special completion message */}
        {completedCount === totalCount && (
          <div className="mb-6 p-4 bg-amber-200/10 border border-amber-200/30 rounded-lg">
            <p className="text-amber-100 text-sm font-light italic">
              "{t('progress.completionQuote')}"
            </p>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-amber-200 text-slate-900 rounded-lg hover:bg-amber-300 transition-colors font-medium tracking-wide"
        >
          {t('progress.continueJourney')}
        </button>
      </div>
    </div>
  );
};