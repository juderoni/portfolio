import { useState, useEffect, useRef } from 'react';
import { travelLocations } from '../data';
import { Globe, LocationModal } from '../components';
import type { TravelLocation } from '../types';
import './Travel.css';

const Travel = () => {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDirectlyToGallery, setOpenDirectlyToGallery] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = [headerRef.current, globeRef.current, statsRef.current];
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleLocationSelect = (location: TravelLocation) => {
    console.log('Location selected in Travel component:', location.name); // Debug log
    setSelectedLocation(location);
    setOpenDirectlyToGallery(false);
    setIsModalOpen(true);
  };

  const handlePhotoSelect = (location: TravelLocation) => {
    console.log('Photo gallery selected for:', location.name); // Debug log
    setSelectedLocation(location);
    setOpenDirectlyToGallery(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOpenDirectlyToGallery(false);
    // Keep selectedLocation for globe highlighting
  };

  // Calculate travel statistics
  const totalCountries = new Set(travelLocations.map(loc => loc.country)).size;
  const totalVisits = travelLocations.reduce((sum, loc) => sum + loc.visits.length, 0);
  const totalLocations = travelLocations.length;

  return (
    <div className="travel-page">
      <div className="travel-container">
        {/* Header Section */}
        <div ref={headerRef} className="travel-header animate-on-scroll">
          <h1 className="animate-fade-in-up">Travel Adventures</h1>
          <p className="animate-fade-in-up animate-stagger-1">
            Explore the world through my travels. Click on the globe markers to discover
            the places I've visited, the experiences I've had, and the memories I've made
            along the way.
          </p>
        </div>

        {/* Travel Statistics */}
        <div ref={statsRef} className="travel-stats animate-on-scroll">
          <div className="stat-card animate-scale-in animate-stagger-1">
            <div className="stat-icon">🌍</div>
            <div className="stat-number">{totalCountries}</div>
            <div className="stat-label">Countries Visited</div>
          </div>
          <div className="stat-card animate-scale-in animate-stagger-2">
            <div className="stat-icon">📍</div>
            <div className="stat-number">{totalLocations}</div>
            <div className="stat-label">Cities Explored</div>
          </div>
          <div className="stat-card animate-scale-in animate-stagger-3">
            <div className="stat-icon">✈️</div>
            <div className="stat-number">{totalVisits}</div>
            <div className="stat-label">Total Trips</div>
          </div>
        </div>

        {/* Interactive Globe */}
        <div ref={globeRef} className="globe-section animate-on-scroll">
          <h2 className="section-title animate-fade-in-up">Interactive Travel Map</h2>
          <div className="globe-wrapper animate-fade-in-up animate-stagger-1">
            <Globe
              locations={travelLocations}
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />
          </div>

          {/* Quick Access Location Cards */}
          <div className="location-buttons animate-fade-in-up animate-stagger-2">
            <p className="fallback-text">Quick access to all destinations:</p>
            <div className="button-grid">
              {travelLocations.map((location) => {
                const totalPhotos = location.visits.reduce((sum, visit) => sum + visit.photos.length, 0);
                return (
                  <div key={location.id} className="location-card">
                    <div className="location-info">
                      <h4>{location.name}</h4>
                      <span className="location-country">{location.country}</span>
                      <div className="location-stats">
                        <span className="photo-count">📸 {totalPhotos} photos</span>
                        <span className="visit-count">✈️ {location.visits.length} visits</span>
                      </div>
                    </div>
                    <div className="location-actions">
                      <button
                        className="location-button primary"
                        onClick={() => handleLocationSelect(location)}
                      >
                        View Details
                      </button>
                      <button
                        className="location-button secondary"
                        onClick={() => handlePhotoSelect(location)}
                        title="Quick photo view"
                      >
                        📸 Photos
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Adventures */}
        <div className="recent-adventures animate-on-scroll">
          <h2 className="section-title animate-fade-in-up">Recent Adventures</h2>
          <div className="adventures-grid">
            {travelLocations
              .slice()
              .sort((a, b) => {
                const latestA = Math.max(...a.visits.map(v => new Date(v.visitDate + ' 1').getTime()));
                const latestB = Math.max(...b.visits.map(v => new Date(v.visitDate + ' 1').getTime()));
                return latestB - latestA;
              })
              .slice(0, 3)
              .map((location, index) => {
                const latestVisit = location.visits.reduce((latest, visit) => {
                  const visitTime = new Date(visit.visitDate + ' 1').getTime();
                  const latestTime = new Date(latest.visitDate + ' 1').getTime();
                  return visitTime > latestTime ? visit : latest;
                });

                return (
                  <div
                    key={location.id}
                    className={`adventure-card hover-lift animate-fade-in-up animate-stagger-${index + 1}`}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div className="adventure-header">
                      <h3>{location.name}</h3>
                      <span className="adventure-country">{location.country}</span>
                    </div>
                    <p className="adventure-description">{location.description}</p>
                    <div className="adventure-details">
                      <div className="adventure-stat">
                        <span className="stat-label">Latest Visit</span>
                        <span className="stat-value">{latestVisit.visitDate}</span>
                      </div>
                      <div className="adventure-stat">
                        <span className="stat-label">Total Visits</span>
                        <span className="stat-value">{location.visits.length}</span>
                      </div>
                    </div>
                    <div className="adventure-cta">
                      <span>Click to explore →</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Location Detail Modal */}
      <LocationModal
        location={selectedLocation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        openDirectlyToGallery={openDirectlyToGallery}
      />
    </div>
  );
};

export default Travel;