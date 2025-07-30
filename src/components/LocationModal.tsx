import { useEffect, useState } from 'react';
import type { TravelLocation } from '../types';
import './LocationModal.css';

interface LocationModalProps {
  location: TravelLocation | null;
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal = ({ location, isOpen, onClose }: LocationModalProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentVisitPhotos, setCurrentVisitPhotos] = useState<string[]>([]);
  const [currentVisitInfo, setCurrentVisitInfo] = useState<{ visitDate: string; locationName: string } | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (galleryOpen) {
          setGalleryOpen(false);
        } else {
          onClose();
        }
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
  }, [isOpen, galleryOpen, onClose]);

  // Handle gallery keyboard navigation
  useEffect(() => {
    const handleGalleryKeys = (event: KeyboardEvent) => {
      if (!galleryOpen) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigatePhoto('prev');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigatePhoto('next');
      }
    };

    document.addEventListener('keydown', handleGalleryKeys);
    return () => document.removeEventListener('keydown', handleGalleryKeys);
  }, [galleryOpen, currentPhotoIndex, currentVisitPhotos.length]);

  const openGallery = (photos: string[], photoIndex: number, visitDate: string, locationName: string) => {
    setCurrentVisitPhotos(photos);
    setCurrentPhotoIndex(photoIndex);
    setCurrentVisitInfo({ visitDate, locationName });
    setGalleryOpen(true);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? currentVisitPhotos.length - 1 : prev - 1
      );
    } else {
      setCurrentPhotoIndex((prev) =>
        prev === currentVisitPhotos.length - 1 ? 0 : prev + 1
      );
    }
  };

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
                          <div
                            key={index}
                            className="photo-item"
                            onClick={() => openGallery(visit.photos, index, visit.visitDate, location.name)}
                          >
                            <img
                              src={photo}
                              alt={`${location.name} - ${visit.visitDate} photo ${index + 1}`}
                              className="photo-image"
                              loading="lazy"
                              onError={(e) => {
                                console.error(`Failed to load image: ${photo}`);
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="photo-overlay">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </div>
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

      {/* Full-size Photo Gallery */}
      {galleryOpen && currentVisitInfo && (
        <div className="photo-gallery-overlay" onClick={() => setGalleryOpen(false)}>
          <div className="photo-gallery" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-header">
              <button
                className="gallery-close-button"
                onClick={() => setGalleryOpen(false)}
                aria-label="Close gallery"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="gallery-content">
              <div className="gallery-info-sidebar">
                <h3>{currentVisitInfo.locationName}</h3>
                <p>{currentVisitInfo.visitDate}</p>
                <span className="photo-counter">
                  {currentPhotoIndex + 1} of {currentVisitPhotos.length}
                </span>
              </div>
              <button
                className="gallery-nav-button gallery-prev"
                onClick={() => navigatePhoto('prev')}
                aria-label="Previous photo"
                disabled={currentVisitPhotos.length <= 1}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>

              <div className="gallery-image-container">
                <img
                  src={currentVisitPhotos[currentPhotoIndex]}
                  alt={`${currentVisitInfo.locationName} - ${currentVisitInfo.visitDate} photo ${currentPhotoIndex + 1}`}
                  className="gallery-image"
                  onError={(e) => {
                    console.error(`Failed to load gallery image: ${currentVisitPhotos[currentPhotoIndex]}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <button
                className="gallery-nav-button gallery-next"
                onClick={() => navigatePhoto('next')}
                aria-label="Next photo"
                disabled={currentVisitPhotos.length <= 1}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>

            {/* Photo thumbnails */}
            {currentVisitPhotos.length > 1 && (
              <div className="gallery-thumbnails">
                {currentVisitPhotos.map((photo, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationModal;