import { useState, useEffect, useRef } from 'react';
import type { TravelLocation, TravelVisit } from '../types';

const TravelPage = () => {
  const [data, setData] = useState<TravelLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingVisitIndex, setEditingVisitIndex] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/travel');
      if (!response.ok) {
        throw new Error('Failed to fetch travel data');
      }
      const travelData = await response.json();
      setData(travelData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await fetch('/api/travel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save data');
      }

      setSuccess(true);
      setEditingIndex(null);
      setEditingVisitIndex(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const generateDefaultPhotoPath = (locationName: string, visitDate: string, photoIndex: number) => {
    const locationSlug = locationName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const dateSlug = visitDate.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return `/images/travel/${locationSlug}_${dateSlug}/${locationSlug}_${dateSlug}_${photoIndex + 1}.jpeg`;
  };

  const handleImageUpload = async (locationIndex: number, visitIndex: number, photoIndex: number, file: File) => {
    try {
      const location = data[locationIndex];
      const visit = location.visits[visitIndex];
      
      // Generate default path
      const defaultPath = generateDefaultPhotoPath(location.name, visit.visitDate, photoIndex);
      
      // For now, just set the default path - in a real implementation, you'd upload the file
      // TODO: Implement actual file upload to server
      handlePhotoChange(locationIndex, visitIndex, photoIndex, defaultPath);
      
      // Show success message
      alert(`Image would be uploaded to: ${defaultPath}\n\nFor now, the path has been set. You can modify it if needed.`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const handleAddLocation = () => {
    const newLocation: TravelLocation = {
      id: `location-${Date.now()}`,
      name: '',
      country: '',
      coordinates: { lat: 0, lng: 0 },
      description: '',
      totalTimeSpent: '',
      visits: [{
        id: `visit-${Date.now()}`,
        visitDate: '',
        duration: '',
        description: '',
        photos: [''],
        highlights: [''],
      }],
    };
    setData([newLocation, ...data]);
    setEditingIndex(0);
  };

  const handleDeleteLocation = (index: number) => {
    if (confirm('Are you sure you want to delete this travel location?')) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  const handleLocationChange = (index: number, field: keyof TravelLocation, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleCoordinateChange = (index: number, coord: 'lat' | 'lng', value: number) => {
    const newData = [...data];
    newData[index].coordinates[coord] = value;
    setData(newData);
  };

  const handleAddVisit = (locationIndex: number) => {
    const newVisit: TravelVisit = {
      id: `visit-${Date.now()}`,
      visitDate: '',
      duration: '',
      description: '',
      photos: [''],
      highlights: [''],
    };
    const newData = [...data];
    newData[locationIndex].visits.push(newVisit);
    setData(newData);
  };

  const handleDeleteVisit = (locationIndex: number, visitIndex: number) => {
    if (confirm('Are you sure you want to delete this visit?')) {
      const newData = [...data];
      newData[locationIndex].visits.splice(visitIndex, 1);
      setData(newData);
    }
  };

  const handleVisitChange = (locationIndex: number, visitIndex: number, field: keyof TravelVisit, value: any) => {
    const newData = [...data];
    newData[locationIndex].visits[visitIndex] = { 
      ...newData[locationIndex].visits[visitIndex], 
      [field]: value 
    };
    setData(newData);
  };

  const handlePhotoChange = (locationIndex: number, visitIndex: number, photoIndex: number, value: string) => {
    const newData = [...data];
    newData[locationIndex].visits[visitIndex].photos[photoIndex] = value;
    setData(newData);
  };

  const addPhoto = (locationIndex: number, visitIndex: number) => {
    const newData = [...data];
    const location = newData[locationIndex];
    const visit = location.visits[visitIndex];
    const defaultPath = generateDefaultPhotoPath(location.name, visit.visitDate, visit.photos.length);
    newData[locationIndex].visits[visitIndex].photos.push(defaultPath);
    setData(newData);
  };

  const removePhoto = (locationIndex: number, visitIndex: number, photoIndex: number) => {
    const newData = [...data];
    newData[locationIndex].visits[visitIndex].photos.splice(photoIndex, 1);
    setData(newData);
  };

  const handleHighlightChange = (locationIndex: number, visitIndex: number, highlightIndex: number, value: string) => {
    const newData = [...data];
    newData[locationIndex].visits[visitIndex].highlights[highlightIndex] = value;
    setData(newData);
  };

  const addHighlight = (locationIndex: number, visitIndex: number) => {
    const newData = [...data];
    newData[locationIndex].visits[visitIndex].highlights.push('');
    setData(newData);
  };

  const removeHighlight = (locationIndex: number, visitIndex: number, highlightIndex: number) => {
    const newData = [...data];
    newData[locationIndex].visits[visitIndex].highlights.splice(highlightIndex, 1);
    setData(newData);
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading travel data...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1>Travel Management</h1>
        <p className="text-muted">
          Manage your travel locations, visits, photos, and experiences for the interactive globe.
        </p>
      </div>

      {error && (
        <div style={{
          background: 'var(--error-light)',
          color: 'var(--error)',
          padding: 'var(--spacing-4)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-6)',
          border: '1px solid var(--error)'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div style={{
          background: 'var(--success-light)',
          color: 'var(--success)',
          padding: 'var(--spacing-4)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-6)',
          border: '1px solid var(--success)'
        }}>
          <strong>Success:</strong> Travel data updated successfully!
        </div>
      )}

      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <button onClick={handleAddLocation} className="btn btn-primary" style={{ padding: 'var(--spacing-3) var(--spacing-6)' }}>
          ➕ Add Travel Location
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {data.map((location, locationIndex) => (
          <div key={location.id} style={{
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}>
            {/* Location Header - Always Visible */}
            <div style={{
              background: 'var(--surface)',
              padding: 'var(--spacing-4)',
              borderBottom: editingIndex === locationIndex ? '1px solid var(--border)' : 'none'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: 0, marginBottom: 'var(--spacing-1)' }}>
                    🌍 {location.name || 'New Location'}, {location.country}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    gap: 'var(--spacing-4)', 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--text-muted)' 
                  }}>
                    <span>📍 {location.coordinates.lat}, {location.coordinates.lng}</span>
                    <span>🗓️ {location.visits.length} visit{location.visits.length !== 1 ? 's' : ''}</span>
                    <span>⏱️ {location.totalTimeSpent}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                  <button
                    onClick={() => setEditingIndex(editingIndex === locationIndex ? null : locationIndex)}
                    className="btn btn-primary"
                    style={{ 
                      padding: 'var(--spacing-3) var(--spacing-5)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-semibold)'
                    }}
                  >
                    {editingIndex === locationIndex ? '❌ Cancel' : '✏️ Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(locationIndex)}
                    className="btn btn-error"
                    style={{ 
                      padding: 'var(--spacing-3) var(--spacing-5)',
                      fontSize: 'var(--text-base)'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Location Details - Only When Editing */}
            {editingIndex === locationIndex && (
              <div style={{ padding: 'var(--spacing-6)', background: 'var(--background)' }}>
                
                {/* Basic Info Section */}
                <div style={{
                  background: 'var(--surface)',
                  padding: 'var(--spacing-4)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-4)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <h4 style={{ margin: 0 }}>📋 Basic Information</h4>
                    <button
                      onClick={() => toggleSection(`basic-${locationIndex}`)}
                      className="btn btn-secondary"
                      style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}
                    >
                      {expandedSections[`basic-${locationIndex}`] ? '🔼 Collapse' : '🔽 Expand'}
                    </button>
                  </div>

                  {(expandedSections[`basic-${locationIndex}`] ?? true) && (
                    <div>
                      <div className="grid grid-2">
                        <div>
                          <label>Location Name *</label>
                          <input
                            type="text"
                            value={location.name}
                            onChange={(e) => handleLocationChange(locationIndex, 'name', e.target.value)}
                            placeholder="e.g., Amsterdam"
                            required
                          />
                        </div>
                        <div>
                          <label>Country *</label>
                          <input
                            type="text"
                            value={location.country}
                            onChange={(e) => handleLocationChange(locationIndex, 'country', e.target.value)}
                            placeholder="e.g., Netherlands"
                            required
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: 'var(--spacing-4)' }}>
                        <label>Location ID *</label>
                        <input
                          type="text"
                          value={location.id}
                          onChange={(e) => handleLocationChange(locationIndex, 'id', e.target.value)}
                          placeholder="Unique identifier (kebab-case)"
                          required
                        />
                      </div>

                      <div style={{ marginTop: 'var(--spacing-4)' }}>
                        <label>Total Time Spent</label>
                        <input
                          type="text"
                          value={location.totalTimeSpent}
                          onChange={(e) => handleLocationChange(locationIndex, 'totalTimeSpent', e.target.value)}
                          placeholder="e.g., 2 weeks"
                        />
                      </div>

                      <div style={{ marginTop: 'var(--spacing-4)' }}>
                        <label>Location Description</label>
                        <textarea
                          rows={3}
                          value={location.description}
                          onChange={(e) => handleLocationChange(locationIndex, 'description', e.target.value)}
                          placeholder="Brief description of the location"
                          style={{ resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Coordinates Section */}
                <div style={{
                  background: 'var(--surface)',
                  padding: 'var(--spacing-4)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-4)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-3)'
                  }}>
                    <h4 style={{ margin: 0 }}>📍 Globe Coordinates</h4>
                    <button
                      onClick={() => toggleSection(`coords-${locationIndex}`)}
                      className="btn btn-secondary"
                      style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}
                    >
                      {expandedSections[`coords-${locationIndex}`] ? '🔼 Collapse' : '🔽 Expand'}
                    </button>
                  </div>

                  {(expandedSections[`coords-${locationIndex}`] ?? false) && (
                    <div className="grid grid-2">
                      <div>
                        <label>Latitude *</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={location.coordinates.lat}
                          onChange={(e) => handleCoordinateChange(locationIndex, 'lat', parseFloat(e.target.value) || 0)}
                          placeholder="e.g., 52.3676"
                          required
                        />
                      </div>
                      <div>
                        <label>Longitude *</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={location.coordinates.lng}
                          onChange={(e) => handleCoordinateChange(locationIndex, 'lng', parseFloat(e.target.value) || 0)}
                          placeholder="e.g., 4.9041"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Visits Section */}
                <div style={{
                  background: 'var(--surface)',
                  padding: 'var(--spacing-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-4)'
                  }}>
                    <h4 style={{ margin: 0 }}>🗓️ Visits to {location.name}</h4>
                    <button
                      onClick={() => handleAddVisit(locationIndex)}
                      className="btn btn-primary"
                      style={{ padding: 'var(--spacing-3) var(--spacing-5)' }}
                    >
                      ➕ Add Visit
                    </button>
                  </div>

                  {location.visits.map((visit, visitIndex) => (
                    <div key={visit.id} style={{ 
                      border: '2px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--spacing-4)',
                      overflow: 'hidden'
                    }}>
                      {/* Visit Header */}
                      <div style={{
                        background: 'var(--background)',
                        padding: 'var(--spacing-3)',
                        borderBottom: editingVisitIndex === visitIndex ? '1px solid var(--border)' : 'none'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center'
                        }}>
                          <div>
                            <h5 style={{ margin: 0, marginBottom: 'var(--spacing-1)' }}>
                              ✈️ Visit {visitIndex + 1} - {visit.visitDate || 'New Visit'}
                            </h5>
                            <div style={{ 
                              fontSize: 'var(--text-sm)', 
                              color: 'var(--text-muted)',
                              display: 'flex',
                              gap: 'var(--spacing-3)'
                            }}>
                              <span>⏱️ {visit.duration}</span>
                              <span>📸 {visit.photos.filter(p => p).length} photos</span>
                              <span>⭐ {visit.highlights.filter(h => h).length} highlights</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                            <button
                              onClick={() => setEditingVisitIndex(
                                editingVisitIndex === visitIndex ? null : visitIndex
                              )}
                              className="btn btn-primary"
                              style={{ 
                                padding: 'var(--spacing-3) var(--spacing-4)',
                                fontSize: 'var(--text-sm)'
                              }}
                            >
                              {editingVisitIndex === visitIndex ? '🔼 Collapse' : '🔽 Expand'}
                            </button>
                            <button
                              onClick={() => handleDeleteVisit(locationIndex, visitIndex)}
                              className="btn btn-error"
                              style={{ 
                                padding: 'var(--spacing-3) var(--spacing-4)',
                                fontSize: 'var(--text-sm)'
                              }}
                              disabled={location.visits.length === 1}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Visit Details */}
                      {editingVisitIndex === visitIndex && (
                        <div style={{ padding: 'var(--spacing-4)' }}>
                          <div className="grid grid-2">
                            <div>
                              <label>Visit Date *</label>
                              <input
                                type="text"
                                value={visit.visitDate}
                                onChange={(e) => handleVisitChange(locationIndex, visitIndex, 'visitDate', e.target.value)}
                                placeholder="e.g., April 2023"
                                required
                              />
                            </div>
                            <div>
                              <label>Duration *</label>
                              <input
                                type="text"
                                value={visit.duration}
                                onChange={(e) => handleVisitChange(locationIndex, visitIndex, 'duration', e.target.value)}
                                placeholder="e.g., 1 week"
                                required
                              />
                            </div>
                          </div>

                          <div style={{ marginTop: 'var(--spacing-3)' }}>
                            <label>Visit ID *</label>
                            <input
                              type="text"
                              value={visit.id}
                              onChange={(e) => handleVisitChange(locationIndex, visitIndex, 'id', e.target.value)}
                              placeholder="Unique identifier"
                              required
                            />
                          </div>

                          <div style={{ marginTop: 'var(--spacing-3)' }}>
                            <label>Visit Description</label>
                            <textarea
                              rows={3}
                              value={visit.description}
                              onChange={(e) => handleVisitChange(locationIndex, visitIndex, 'description', e.target.value)}
                              placeholder="Description of this specific visit"
                              style={{ resize: 'vertical' }}
                            />
                          </div>

                          {/* Photos Section */}
                          <div style={{ 
                            marginTop: 'var(--spacing-4)',
                            padding: 'var(--spacing-3)',
                            background: 'var(--surface)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)'
                          }}>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              marginBottom: 'var(--spacing-3)'
                            }}>
                              <label style={{ margin: 0, fontWeight: 'var(--font-semibold)' }}>📸 Photos</label>
                              <button
                                type="button"
                                onClick={() => addPhoto(locationIndex, visitIndex)}
                                className="btn btn-primary"
                                style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}
                              >
                                ➕ Add Photo
                              </button>
                            </div>
                            {visit.photos.map((photo, photoIndex) => (
                              <div key={photoIndex} style={{ 
                                display: 'flex', 
                                gap: 'var(--spacing-2)', 
                                marginBottom: 'var(--spacing-2)',
                                alignItems: 'center'
                              }}>
                                <input
                                  type="text"
                                  value={photo}
                                  onChange={(e) => handlePhotoChange(locationIndex, visitIndex, photoIndex, e.target.value)}
                                  placeholder="/images/travel/location/photo.jpg"
                                  style={{ flex: 1 }}
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleImageUpload(locationIndex, visitIndex, photoIndex, file);
                                    }
                                  }}
                                  style={{ display: 'none' }}
                                  id={`photo-upload-${locationIndex}-${visitIndex}-${photoIndex}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const input = document.getElementById(`photo-upload-${locationIndex}-${visitIndex}-${photoIndex}`) as HTMLInputElement;
                                    input?.click();
                                  }}
                                  className="btn btn-secondary"
                                  style={{ padding: 'var(--spacing-2) var(--spacing-3)' }}
                                >
                                  📁 Upload
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removePhoto(locationIndex, visitIndex, photoIndex)}
                                  className="btn btn-error"
                                  style={{ padding: 'var(--spacing-2) var(--spacing-3)' }}
                                  disabled={visit.photos.length === 1}
                                >
                                  🗑️
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Highlights Section */}
                          <div style={{ 
                            marginTop: 'var(--spacing-4)',
                            padding: 'var(--spacing-3)',
                            background: 'var(--surface)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)'
                          }}>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              marginBottom: 'var(--spacing-3)'
                            }}>
                              <label style={{ margin: 0, fontWeight: 'var(--font-semibold)' }}>⭐ Highlights</label>
                              <button
                                type="button"
                                onClick={() => addHighlight(locationIndex, visitIndex)}
                                className="btn btn-primary"
                                style={{ padding: 'var(--spacing-2) var(--spacing-4)' }}
                              >
                                ➕ Add Highlight
                              </button>
                            </div>
                            {visit.highlights.map((highlight, highlightIndex) => (
                              <div key={highlightIndex} style={{ 
                                display: 'flex', 
                                gap: 'var(--spacing-2)', 
                                marginBottom: 'var(--spacing-2)' 
                              }}>
                                <input
                                  type="text"
                                  value={highlight}
                                  onChange={(e) => handleHighlightChange(locationIndex, visitIndex, highlightIndex, e.target.value)}
                                  placeholder="Highlight or memorable moment"
                                  style={{ flex: 1 }}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeHighlight(locationIndex, visitIndex, highlightIndex)}
                                  className="btn btn-error"
                                  style={{ padding: 'var(--spacing-2) var(--spacing-3)' }}
                                  disabled={visit.highlights.length === 1}
                                >
                                  🗑️
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {data.length > 0 && (
        <div style={{ 
          marginTop: 'var(--spacing-8)',
          display: 'flex',
          gap: 'var(--spacing-4)',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={fetchData}
            className="btn btn-secondary"
            disabled={saving}
            style={{ padding: 'var(--spacing-4) var(--spacing-6)' }}
          >
            🔄 Reset Changes
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            disabled={saving}
            style={{ padding: 'var(--spacing-4) var(--spacing-6)' }}
          >
            {saving ? '💾 Saving...' : '💾 Save All Changes'}
          </button>
        </div>
      )}

      <div className="card mt-8">
        <h4>💡 Travel Management Tips</h4>
        <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
          <li><strong>📍 Coordinates:</strong> Use Google Maps to find accurate lat/lng coordinates</li>
          <li><strong>📸 Photo Upload:</strong> Click "Upload" to select images - paths will be auto-generated</li>
          <li><strong>🗂️ Organization:</strong> Use expand/collapse to focus on specific sections</li>
          <li><strong>🗓️ Multiple Visits:</strong> Add separate visits for different trips to the same location</li>
          <li><strong>🔗 IDs:</strong> Use kebab-case format (e.g., "amsterdam-netherlands")</li>
        </ul>
      </div>
    </div>
  );
};

export default TravelPage;