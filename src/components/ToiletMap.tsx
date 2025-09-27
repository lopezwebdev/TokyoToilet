import React, { useState } from 'react';
import { MapPin, Navigation, Info, Camera, CameraIcon } from 'lucide-react';
import { toiletLocations, ToiletLocation } from '../data/toiletLocations';
import { CameraCapture } from './CameraCapture';
import { ProgressCelebration } from './ProgressCelebration';
import { useLanguage } from '../contexts/LanguageContext';

interface ToiletMapProps {
  selectedToilet?: ToiletLocation;
  onToiletSelect?: (toilet: ToiletLocation) => void;
}

export const ToiletMap: React.FC<ToiletMapProps> = ({ selectedToilet, onToiletSelect }) => {
  const { t, language } = useLanguage();
  const [hoveredToilet, setHoveredToilet] = useState<string | null>(null);
  const [cameraToilet, setCameraToilet] = useState<ToiletLocation | null>(null);
  const [userPhotos, setUserPhotos] = useState<Record<string, string>>({});
  const [completedLocations, setCompletedLocations] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState<{toilet: ToiletLocation, count: number} | null>(null);

  const openInMaps = (toilet: ToiletLocation) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${toilet.coordinates.lat},${toilet.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handlePhotoTaken = (toiletId: string, photoUrl: string) => {
    setUserPhotos(prev => ({ ...prev, [toiletId]: photoUrl }));
    
    // Mark location as completed
    const newCompleted = new Set(completedLocations);
    const wasAlreadyCompleted = newCompleted.has(toiletId);
    newCompleted.add(toiletId);
    setCompletedLocations(newCompleted);
    
    // Show celebration only for first-time completions
    if (!wasAlreadyCompleted) {
      const toilet = toiletLocations.find(t => t.id === toiletId);
      if (toilet) {
        setShowCelebration({ toilet, count: newCompleted.size });
      }
    }
    
    setCameraToilet(null);
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-600/30">
        <Camera className="w-5 h-5 text-amber-200" />
        <h2 className="text-xl font-light text-slate-200 tracking-wide uppercase">{t('map.title')}</h2>
      </div>

      <div className="grid gap-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
      <div className="grid gap-6 max-h-[600px] overflow-y-auto scrollbar-hidden">
        {toiletLocations.map((toilet) => (
          <div
            key={toilet.id}
            className={`p-6 border transition-all duration-300 cursor-pointer group ${
              selectedToilet?.id === toilet.id
                ? 'border-amber-200 bg-slate-700/30'
                : completedLocations.has(toilet.id)
                ? 'border-green-400/50 bg-green-900/10'
                : hoveredToilet === toilet.id
                ? 'border-white bg-white/20'
                : 'border-white bg-white/20 hover:border-white hover:bg-white/20'
            } rounded-lg`}
            onMouseEnter={() => setHoveredToilet(toilet.id)}
            onMouseLeave={() => setHoveredToilet(null)}
            onClick={() => onToiletSelect?.(toilet)}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
              <div className="flex-1 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-light text-slate-200 text-lg tracking-wide">
                    {language === 'ja' ? toilet.nameJa : toilet.name}
                  </h3>
                  {completedLocations.has(toilet.id) && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-400/20 border border-green-400/30 rounded-full">
                      <Camera className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">{t('map.visited')}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-amber-200 mb-3 font-light italic">
                  by {language === 'ja' ? toilet.architectJa : toilet.architect}
                </p>
                <p className="text-xs text-white mb-3 font-light">
                  {language === 'ja' ? toilet.addressJa : toilet.address}
                </p>
                <p className="text-sm text-slate-300 font-light leading-relaxed">{t(`toilet.${toilet.id}.description`)}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openInMaps(toilet);
                      }}
                      className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-white hover:text-amber-200 hover:bg-slate-700/50 transition-all duration-200 text-xs sm:text-sm rounded-lg"
                      title="Open in Google Maps"
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="hidden sm:inline">{t('map.viewLocation')}</span>
                      <span className="sm:hidden">{t('map.location')}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCameraToilet(toilet);
                      }}
                      className="flex items-center justify-end sm:justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-white hover:text-amber-200 hover:bg-slate-700/50 transition-all duration-200 text-xs sm:text-sm rounded-lg"
                      title="Take a photo at this location"
                    >
                      <CameraIcon className="w-4 h-4" />
                      <span>{t('map.capture')}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 order-1 lg:order-2">
                <div className="space-y-3">
                  {toilet.image && (
                    <div 
                      className="w-full sm:w-64 lg:w-56 h-40 overflow-hidden bg-slate-700 border border-slate-600 group-hover:border-slate-500 transition-colors rounded-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        openInMaps(toilet);
                      }}
                      title="Open location in Google Maps"
                    >
                      <img
                        src={toilet.image}
                        alt={toilet.name}
                        className="w-full h-full object-cover group-hover:grayscale transition-all duration-300 pointer-events-none"
                      />
                    </div>
                  )}
                  {userPhotos[toilet.id] && (
                    <div 
                      className="w-full sm:w-64 lg:w-56 h-40 overflow-hidden bg-slate-700 border border-amber-200/50 transition-colors rounded-lg cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        openInMaps(toilet);
                      }}
                      title="Open location in Google Maps"
                    >
                      <img
                        src={userPhotos[toilet.id]}
                        alt={`Your photo at ${toilet.name}`}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className="mt-8 p-6 bg-slate-900/50 border border-slate-600/30 rounded-lg">
        <div className="flex items-start gap-4">
          <Info className="w-5 h-5 text-amber-200 mt-0.5" />
          <div>
            <h4 className="font-light text-slate-200 mb-2 tracking-wide">{t('map.about.title')}</h4>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {t('map.about.description')}
            </p>
          </div>
        </div>
      </div>

      {cameraToilet && (
        <CameraCapture
          locationName={cameraToilet.name}
          onClose={() => setCameraToilet(null)}
          onPhotoTaken={(photoUrl) => handlePhotoTaken(cameraToilet.id, photoUrl)}
        />
      )}

      {showCelebration && (
        <ProgressCelebration
          locationName={showCelebration.toilet.name}
          architect={showCelebration.toilet.architect}
          completedCount={showCelebration.count}
          totalCount={toiletLocations.length}
          onClose={() => setShowCelebration(null)}
        />
      )}
    </>
  );
};