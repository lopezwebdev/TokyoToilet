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

// Function to create numbered icons
const createNumberedIcon = (index: number, isVisited: boolean) => {
    const color = isVisited ? 'green' : 'blue';
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div style="position: relative; width: 30px; height: 42px;">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png" style="width: 25px; height: 41px; display: block; margin: 0 auto;" />
                <span style="position: absolute; top: 6px; left: 0; width: 100%; text-align: center; color: white; font-weight: bold; font-size: 11px; text-shadow: 0px 1px 2px rgba(0,0,0,0.5);">${index + 1}</span>
            </div>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -34]
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
                            <div className="text-center">
                                <h3 className="font-bold text-lg mb-1">{index + 1}. {toilet.name}</h3>
                                <p className="text-sm italic mb-2">by {toilet.architect}</p>
                                {completedLocations.has(toilet.id) ? (
                                    <div className="text-green-600 font-bold mb-2">✓ Visited</div>
                                ) : (
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                        onClick={() => onToiletSelect(toilet)}
                                    >
                                        Check In / Take Photo
                                    </button>
                                )}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${toilet.coordinates.lat},${toilet.coordinates.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block mt-2 text-xs text-blue-400 hover:text-blue-600 underline"
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
