import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toiletLocations, ToiletLocation } from '../data/toiletLocations';
import L from 'leaflet';

// Fix for default marker icon using CDN
const DefaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Function to create numbered icons with larger circles
const createNumberedIcon = (index: number, isVisited: boolean) => {
    const bgColor = isVisited ? '#22c55e' : '#3b82f6'; // green-500 : blue-500

    return L.divIcon({
        className: 'custom-numbered-pin',
        html: `
            <div style="
                position: relative;
                width: 36px; 
                height: 36px;
            ">
                <div style="
                    background-color: ${bgColor};
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    position: relative;
                    z-index: 2;
                ">
                    ${index + 1}
                </div>
                <div style="
                    position: absolute;
                    bottom: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 10px solid ${bgColor};
                    z-index: 1;
                    filter: drop-shadow(0 2px 1px rgba(0,0,0,0.2));
                "></div>
            </div>
        `,
        iconSize: [36, 46], // Width 36, Height 36+10(tail)
        iconAnchor: [18, 46], // Center X (18), Bottom Y (46)
        popupAnchor: [0, -46]
    });
};

const currentLocationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface InteractiveMapProps {
    completedLocations: Set<string>;
    onToiletSelect: (toilet: ToiletLocation) => void;
    userLocation: { lat: number; lng: number } | null;
}

const RecenterMap = ({ center }: { center: { lat: number; lng: number } }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([center.lat, center.lng], 15);
    }, [center, map]);
    return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
    completedLocations,
    onToiletSelect,
    userLocation
}) => {
    const center = { lat: 35.65910807942215, lng: 139.7037289296481 }; // Default Tokyo/Shibuya center

    return (
        <div className="h-[600px] w-full rounded-lg overflow-hidden border border-slate-600/50 shadow-xl relative z-0">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User Location Marker */}
                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]} icon={currentLocationIcon}>
                        <Popup>You are Here</Popup>
                    </Marker>
                )}

                {/* Toilet Markers */}
                {toiletLocations.map((toilet, index) => (
                    <Marker
                        key={toilet.id}
                        position={[toilet.coordinates.lat, toilet.coordinates.lng]}
                        icon={createNumberedIcon(index, completedLocations.has(toilet.id))}
                    >
                        <Popup>
                            <div className="text-center min-w-[200px]">
                                <h3 className="font-bold text-lg mb-1">{index + 1}. {toilet.name}</h3>
                                <p className="text-sm italic mb-3">by {toilet.architect}</p>
                                {completedLocations.has(toilet.id) ? (
                                    <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md font-bold mb-2 flex items-center justify-center gap-2">
                                        <span>✓</span> Visited
                                    </div>
                                ) : (
                                    <button
                                        className="w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors font-medium text-sm"
                                        onClick={() => onToiletSelect(toilet)}
                                    >
                                        Check In / Take Photo
                                    </button>
                                )}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${toilet.coordinates.lat},${toilet.coordinates.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block mt-3 text-xs text-slate-500 hover:text-amber-600 hover:underline"
                                >
                                    Open in Google Maps
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {userLocation && <RecenterMap center={userLocation} />}
            </MapContainer>
        </div>
    );
};
