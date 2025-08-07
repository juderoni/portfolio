import { useState, useEffect } from 'react';
import type { Experience } from '../types';

const ExperiencePage = () => {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/experience');
      if (!response.ok) {
        throw new Error('Failed to fetch experience data');
      }
      const experienceData = await response.json();
      setData(experienceData);
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

      const response = await fetch('/api/experience', {
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
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [''],
    };
    setData([newExperience, ...data]); // Add to beginning for chronological order
    setEditingIndex(0);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  const handleChange = (index: number, field: keyof Experience, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleAchievementChange = (expIndex: number, achIndex: number, value: string) => {
    const newData = [...data];
    newData[expIndex].achievements[achIndex] = value;
    setData(newData);
  };

  const addAchievement = (expIndex: number) => {
    const newData = [...data];
    newData[expIndex].achievements.push('');
    setData(newData);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const newData = [...data];
    newData[expIndex].achievements.splice(achIndex, 1);
    setData(newData);
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const newData = [...data];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newData.length) {
      [newData[index], newData[targetIndex]] = [newData[targetIndex], newData[index]];
      setData(newData);
      
      // Update editing index if needed
      if (editingIndex === index) {
        setEditingIndex(targetIndex);
      } else if (editingIndex === targetIndex) {
        setEditingIndex(index);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading experience data...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1>Experience Management</h1>
        <p className="text-muted">
          Manage your work experience, positions, and professional achievements.
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
          <strong>Success:</strong> Experience data updated successfully!
        </div>
      )}

      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Experience Entry
        </button>
      </div>

      <div className="grid" style={{ gap: 'var(--spacing-6)' }}>
        {data.map((experience, index) => (
          <div key={index} className="card">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: 'var(--spacing-4)'
            }}>
              <div>
                <h3>{experience.company || 'New Experience Entry'}</h3>
                <p className="text-muted" style={{ margin: 0 }}>
                  {experience.position} • {experience.startDate} - {experience.endDate}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                <button
                  onClick={() => moveExperience(index, 'up')}
                  className="btn btn-secondary btn-sm"
                  disabled={index === 0}
                  title="Move up (more recent)"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveExperience(index, 'down')}
                  className="btn btn-secondary btn-sm"
                  disabled={index === data.length - 1}
                  title="Move down (older)"
                >
                  ↓
                </button>
                <button
                  onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  className="btn btn-secondary btn-sm"
                >
                  {editingIndex === index ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingIndex === index ? (
              <div>
                <div className="grid grid-2">
                  <div>
                    <label>Company *</label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Position *</label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => handleChange(index, 'position', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Location *</label>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) => handleChange(index, 'location', e.target.value)}
                      placeholder="e.g., New York, NY"
                      required
                    />
                  </div>
                  <div>
                    <label>Start Date *</label>
                    <input
                      type="text"
                      value={experience.startDate}
                      onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                      placeholder="e.g., 2023-01"
                      required
                    />
                  </div>
                  <div>
                    <label>End Date *</label>
                    <input
                      type="text"
                      value={experience.endDate}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                      placeholder="e.g., Present or 2024-12"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                  <label>Job Description *</label>
                  <textarea
                    rows={3}
                    value={experience.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Brief description of your role and responsibilities"
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: 'var(--spacing-2)' 
                  }}>
                    <label>Key Achievements</label>
                    <button
                      type="button"
                      onClick={() => addAchievement(index)}
                      className="btn btn-secondary btn-sm"
                    >
                      Add Achievement
                    </button>
                  </div>
                  {experience.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                      <textarea
                        rows={2}
                        value={achievement}
                        onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                        placeholder="Describe a key achievement or accomplishment"
                        style={{ flex: 1, resize: 'vertical' }}
                      />
                      <button
                        type="button"
                        onClick={() => removeAchievement(index, achIndex)}
                        className="btn btn-error btn-sm"
                        style={{ alignSelf: 'flex-start' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p><strong>Location:</strong> {experience.location}</p>
                <p><strong>Description:</strong> {experience.description}</p>
                <div>
                  <strong>Key Achievements:</strong>
                  <ul style={{ marginTop: 'var(--spacing-2)' }}>
                    {experience.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
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
          >
            Reset Changes
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      )}

      <div className="card mt-8">
        <h4>💡 Tips</h4>
        <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
          <li>List experiences in reverse chronological order (most recent first)</li>
          <li>Use ↑ ↓ buttons to reorder entries</li>
          <li>Include quantifiable achievements when possible</li>
          <li>Use "Present" for current positions</li>
          <li>Keep descriptions concise but informative</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperiencePage;