import React, { useState, useEffect } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useMap
} from '@vis.gl/react-google-maps';
import { toiletLocations, ToiletLocation } from '../data/toiletLocations';

interface GoogleInteractiveMapProps {
    completedLocations: Set<string>;
    onToiletSelect: (toilet: ToiletLocation) => void;
    userLocation: { lat: number; lng: number } | null;
}

const containerStyle = {
    width: '100%',
    height: '600px'
};

const defaultCenter = {
    lat: 35.65910807942215,
    lng: 139.7037289296481
};

// Component to handle map re-centering properly
const MapHandler = ({ center }: { center: { lat: number; lng: number } | null }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !center) return;
        map.panTo(center);
    }, [map, center]);

    return null;
};

export const GoogleInteractiveMap: React.FC<GoogleInteractiveMapProps> = ({
    completedLocations,
    onToiletSelect,
    userLocation
}) => {
    const [selectedMarker, setSelectedMarker] = useState<ToiletLocation | null>(null);

    return (
        <div className="rounded-lg overflow-hidden border border-slate-600/50 shadow-xl relative z-0 h-[600px]">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
                <Map
                    defaultCenter={defaultCenter}
                    defaultZoom={13}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_ID || 'DEMO_MAP_ID'}
                    style={containerStyle}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                >
                    {/* User Location Marker */}
                    {userLocation && (
                        <AdvancedMarker position={userLocation} title={'You are here'}>
                            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        </AdvancedMarker>
                    )}

                    {/* Toilet Markers */}
                    {toiletLocations.map((toilet, index) => {
                        const isCompleted = completedLocations.has(toilet.id);
                        const bgColor = isCompleted ? '#22c55e' : '#3b82f6'; // green-500 : blue-500

                        return (
                            <AdvancedMarker
                                key={toilet.id}
                                position={toilet.coordinates}
                                onClick={() => setSelectedMarker(toilet)}
                                title={toilet.name}
                            >
                                {/* Custom Numbered Pin */}
                                <div className="relative group cursor-pointer transition-transform hover:scale-110" style={{ width: '36px', height: '46px' }}>
                                    <div style={{
                                        backgroundColor: bgColor,
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        position: 'relative',
                                        zIndex: 2,
                                    }}>
                                        {index + 1}
                                    </div>
                                    {/* Pin Tail */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '0',
                                        height: '0',
                                        borderLeft: '8px solid transparent',
                                        borderRight: '8px solid transparent',
                                        borderTop: `10px solid ${bgColor}`,
                                        zIndex: 1,
                                        filter: 'drop-shadow(0 2px 1px rgba(0,0,0,0.2))'
                                    }}></div>
                                </div>
                            </AdvancedMarker>
                        );
                    })}

                    {/* Info Window */}
                    {selectedMarker && (
                        <InfoWindow
                            position={selectedMarker.coordinates}
                            onCloseClick={() => setSelectedMarker(null)}
                            headerContent={<h3 className="font-bold text-lg pr-4">{selectedMarker.name}</h3>}
                        >
                            <div className="p-2 min-w-[200px] text-center">
                                <p className="text-sm italic mb-3 text-slate-600">by {selectedMarker.architect}</p>

                                {completedLocations.has(selectedMarker.id) ? (
                                    <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md font-bold mb-2 flex items-center justify-center gap-2">
                                        <span>✓</span> Visited
                                    </div>
                                ) : (
                                    <button
                                        className="w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors font-medium text-sm mb-2 shadow-sm"
                                        onClick={() => {
                                            onToiletSelect(selectedMarker);
                                            setSelectedMarker(null);
                                        }}
                                    >
                                        Check In / Take Photo
                                    </button>
                                )}

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${selectedMarker.coordinates.lat},${selectedMarker.coordinates.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block mt-2 text-xs text-blue-500 hover:text-blue-700 underline"
                                >
                                    Open in Google Maps App
                                </a>
                            </div>
                        </InfoWindow>
                    )}

                    <MapHandler center={userLocation} />
                </Map>
            </APIProvider>
        </div>
    );
};
