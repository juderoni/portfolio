import { useEffect } from 'react';
import type { TravelLocation } from '../types';
import './LocationModal.css';

interface LocationModalProps {
  location: TravelLocation | null;
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal = ({ location, isOpen, onClose }: LocationModalProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !location) return null;

  return (
    <div className="location-modal-overlay" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>
        <div className="location-modal-header">
          <div className="location-title">
            <h2>{location.name}</h2>
            <p className="location-country">{location.country}</p>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="location-modal-content">
          <div className="location-overview">
            <p className="location-description">{location.description}</p>
            <div className="location-stats">
              <div className="stat">
                <span className="stat-label">Total Time Spent</span>
                <span className="stat-value">{location.totalTimeSpent}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Number of Visits</span>
                <span className="stat-value">{location.visits.length}</span>
              </div>
            </div>
          </div>

          <div className="visits-section">
            <h3>Visit History</h3>
            <div className="visits-list">
              {location.visits.map((visit) => (
                <div key={visit.id} className="visit-card">
                  <div className="visit-header">
                    <h4>{visit.visitDate}</h4>
                    <span className="visit-duration">{visit.duration}</span>
                  </div>
                  
                  <p className="visit-description">{visit.description}</p>
                  
                  <div className="visit-highlights">
                    <h5>Highlights</h5>
                    <ul>
                      {visit.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  {visit.photos.length > 0 && (
                    <div className="visit-photos">
                      <h5>Photos</h5>
                      <div className="photo-grid">
                        {visit.photos.map((photo, index) => (
                          <div key={index} className="photo-placeholder">
                            <div className="photo-icon">📷</div>
                            <span className="photo-name">
                              {photo.split('/').pop()?.replace('.jpg', '') || `Photo ${index + 1}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;