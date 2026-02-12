import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Info, Camera, CameraIcon, CheckCircle, List, Map as MapIcon, Trash2 } from 'lucide-react';
import { toiletLocations, ToiletLocation } from '../data/toiletLocations';
import { CameraCapture } from './CameraCapture';
import { ProgressCelebration } from './ProgressCelebration';
import { InteractiveMap } from './InteractiveMap';
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
  const [showCelebration, setShowCelebration] = useState<{ toilet: ToiletLocation, count: number, total: number } | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapSelectedToilet, setMapSelectedToilet] = useState<ToiletLocation | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    const savedPhotos = localStorage.getItem('tokyo-toilet-photos');
    const savedCompleted = localStorage.getItem('tokyo-toilet-completed');

    if (savedPhotos) {
      setUserPhotos(JSON.parse(savedPhotos));
    }

    if (savedCompleted) {
      setCompletedLocations(new Set(JSON.parse(savedCompleted)));
    }
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handlePhotoTaken = (toiletId: string, photoUrl: string) => {
    // Save photo
    const newPhotos = { ...userPhotos, [toiletId]: photoUrl };
    setUserPhotos(newPhotos);
    localStorage.setItem('tokyo-toilet-photos', JSON.stringify(newPhotos));

    // Mark location as completed
    const newCompleted = new Set(completedLocations);
    const wasAlreadyCompleted = newCompleted.has(toiletId);
    newCompleted.add(toiletId);
    setCompletedLocations(newCompleted);
    localStorage.setItem('tokyo-toilet-completed', JSON.stringify(Array.from(newCompleted)));

    // Show celebration only for first-time completions
    if (!wasAlreadyCompleted) {
      const toilet = toiletLocations.find(t => t.id === toiletId);
      if (toilet) {
        setShowCelebration({
          toilet,
          count: newCompleted.size,
          total: toiletLocations.length
        });
      }
    }

    setCameraToilet(null);
  };

  const handleViewLocation = (toilet: ToiletLocation, e: React.MouseEvent) => {
    e.stopPropagation();
    setMapSelectedToilet(toilet);
    setViewMode('map');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-600/30">
        <div className="flex items-center gap-4">
          <Camera className="w-5 h-5 text-amber-200" />
          <h2 className="text-xl font-light text-slate-200 tracking-wide uppercase">{t('map.title')}</h2>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-600/50">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'list'
              ? 'bg-amber-200/20 text-amber-200 border border-amber-200/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm">List</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === 'map'
              ? 'bg-amber-200/20 text-amber-200 border border-amber-200/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
          >
            <MapIcon className="w-4 h-4" />
            <span className="text-sm">Map</span>
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <InteractiveMap
          completedLocations={completedLocations}
          onToiletSelect={(toilet) => setCameraToilet(toilet)}
          userLocation={userLocation}
          selectedToilet={mapSelectedToilet}
        />
      ) : (
        <div className="grid gap-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
          <div className="grid gap-6 max-h-[600px] overflow-y-auto scrollbar-hidden">
            {toiletLocations.map((toilet, index) => (
              <div
                key={toilet.id}
                className={`p-6 border transition-all duration-300 cursor-pointer group ${selectedToilet?.id === toilet.id
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
                      {/* Number Badge matching Map Marker style - Clickable to View on Map */}
                      <button
                        onClick={(e) => handleViewLocation(toilet, e)}
                        className={`flex items-center justify-center w-9 h-9 rounded-full border-2 border-white shadow-md font-bold text-white text-base shrink-0 transition-transform hover:scale-110 hover:border-amber-200 cursor-pointer ${completedLocations.has(toilet.id) ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                        title="View on Map"
                      >
                        {index + 1}
                      </button>

                      <h3 className="font-light text-slate-200 text-lg tracking-wide">
                        {language === 'ja' ? toilet.nameJa : toilet.name}
                      </h3>
                      {completedLocations.has(toilet.id) && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-400/20 border border-green-400/30 rounded-full">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400 font-medium">{t('map.visited')}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-amber-200 mb-3 font-light italic pl-12">
                      by {language === 'ja' ? toilet.architectJa : toilet.architect}
                    </p>
                    <p className="text-xs text-white mb-3 font-light pl-12">
                      {language === 'ja' ? toilet.addressJa : toilet.address}
                    </p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed pl-12">{t(`toilet.${toilet.id}.description`)}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3 pl-12">
                      <div className="flex flex-row items-center gap-3">
                        {/* View Location -> Now switches to Map layout and flys to pin */}
                        <button
                          onClick={(e) => handleViewLocation(toilet, e)}
                          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-white hover:text-amber-200 hover:bg-slate-700/50 transition-all duration-200 text-xs sm:text-sm rounded-lg"
                          title="View on Map"
                        >
                          <MapIcon className="w-4 h-4" />
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
                      {/* Image Preview clickable to view location on map */}
                      <div
                        className="w-full sm:w-64 lg:w-56 h-40 overflow-hidden bg-slate-700 border border-slate-600 group-hover:border-slate-500 transition-colors rounded-lg cursor-pointer relative group/image"
                        onClick={(e) => handleViewLocation(toilet, e)}
                        title="View on Map"
                      >
                        {/* Toilet Image or Placeholder */}
                        <ToiletImage
                          src={toilet.image}
                          alt={toilet.name}
                          className="w-full h-full object-cover group-hover:grayscale transition-all duration-300 pointer-events-none"
                        />

                        {/* Overlay Hint */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                          <MapIcon className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                      </div>

                      {/* User's Captured Photo */}
                      {userPhotos[toilet.id] && (
                        <div
                          className="w-full sm:w-64 lg:w-56 h-40 overflow-hidden bg-slate-700 border border-green-400/50 transition-colors rounded-lg cursor-pointer relative group/userphoto"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Maybe open full size photo?
                          }}
                        >
                          <img
                            src={userPhotos[toilet.id]}
                            alt={`Your photo at ${toilet.name}`}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-green-400 flex items-center gap-1 backdrop-blur-sm">
                            <CheckCircle className="w-3 h-3" />
                            <span>Captured</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-slate-900/50 border border-slate-600/30 rounded-lg">
        <div className="flex items-start gap-4">
          <Info className="w-5 h-5 text-amber-200 mt-0.5" />
          <div>
            <h4 className="font-light text-slate-200 mb-2 tracking-wide">{t('map.about.title')}</h4>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {t('map.about.description')}
            </p>

            <div className="mt-6">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset all progress? This will delete your local photos and check-ins.")) {
                    localStorage.removeItem('tokyo-toilet-photos');
                    localStorage.removeItem('tokyo-toilet-completed');
                    window.location.reload();
                  }
                }}
                className="text-xs text-red-400/70 hover:text-red-400 flex items-center gap-2 transition-colors px-3 py-2 rounded-md hover:bg-red-900/20 border border-transparent hover:border-red-900/30"
              >
                <Trash2 className="w-3 h-3" />
                Reset All Progress (Local)
              </button>
            </div>
          </div>
        </div>
      </div>

      {cameraToilet && (
        <CameraCapture
          locationName={cameraToilet.name}
          targetCoordinates={cameraToilet.coordinates}
          onClose={() => setCameraToilet(null)}
          onPhotoTaken={(photoUrl) => handlePhotoTaken(cameraToilet.id, photoUrl)}
        />
      )}

      {showCelebration && (
        <ProgressCelebration
          locationName={showCelebration.toilet.name}
          architect={showCelebration.toilet.architect}
          completedCount={showCelebration.count}
          totalCount={showCelebration.total}
          onClose={() => setShowCelebration(null)}
        />
      )}
    </>
  );
};

// Helper component for robust image loading and mission card
const ToiletImage = ({ src, alt, className }: { src?: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);

  // If no image or error loading, show the "Mission Card"
  if (!src || error) {
    return (
      <div className={`w-full h-full bg-slate-900/40 border-2 border-dashed border-slate-700/50 flex flex-col items-center justify-center p-6 text-center group/mission hover:border-amber-500/30 hover:bg-slate-800/60 transition-all cursor-pointer ${className}`}>
        <div className="bg-slate-800 p-3 rounded-full mb-3 group-hover/mission:scale-110 transition-transform shadow-lg border border-slate-700">
          <MapPin className="w-6 h-6 text-amber-500/60 group-hover/mission:text-amber-400" />
        </div>
        <span className="text-[10px] text-amber-500/90 font-bold tracking-widest uppercase mb-1">Mission: Archive</span>
        <span className="text-[11px] text-slate-400 font-light leading-snug">Be the first to capture this location</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      onError={() => setError(true)}
      alt={alt}
      className={className}
    />
  );
};