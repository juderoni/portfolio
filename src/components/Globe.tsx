import { useRef, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import type { TravelLocation } from '../types';
import './Globe.css';

interface GlobeProps {
  locations: TravelLocation[];
  onLocationSelect: (location: TravelLocation) => void;
  selectedLocation?: TravelLocation | null;
}

const InteractiveGlobe = ({ locations, onLocationSelect, selectedLocation }: GlobeProps) => {
  const globeEl = useRef<any>(null);

  // Convert travel locations to points data for react-globe.gl
  const pointsData = useMemo(() => {
    return locations.map(location => ({
      lat: location.coordinates.lat,
      lng: location.coordinates.lng,
      size: selectedLocation?.id === location.id ? 0.8 : 0.4,
      color: selectedLocation?.id === location.id ? '#10b981' : '#ff6b35',
      location: location,
      label: `${location.name}, ${location.country}`
    }));
  }, [locations, selectedLocation]);

  // Handle point clicks
  const handlePointClick = (point: any) => {
    console.log('Clicked location:', point.location.name);
    onLocationSelect(point.location);
  };

  // Auto-rotate to show different parts of the globe
  useEffect(() => {
    if (globeEl.current) {
      // Set initial camera position
      globeEl.current.pointOfView({ altitude: 2.5 });
      
      // Optional: Auto-rotate slowly (can be removed if not wanted)
      // globeEl.current.controls().autoRotate = true;
      // globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div className="globe-container">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Points configuration
        pointsData={pointsData}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.6}
        pointResolution={20}
        pointsMerge={false}
        
        // Point interactions
        onPointClick={handlePointClick}
        pointLabel="label"
        
        // Globe appearance
        atmosphereColor="#4f94cd"
        atmosphereAltitude={0.15}
        
        // Controls
        enablePointerInteraction={true}
        
        // Responsive sizing - fill the container
        width={800}
        height={600}
      />
      
      <div className="globe-instructions">
        <p>🌍 Click on orange markers to explore travel destinations</p>
        <p>🖱️ Drag to rotate the globe - hover over markers to highlight</p>
      </div>
    </div>
  );
};

export default InteractiveGlobe;