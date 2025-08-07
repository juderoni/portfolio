import { useState, useEffect } from 'react';
import type { Education } from '../types';

const EducationPage = () => {
  const [data, setData] = useState<Education[]>([]);
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
      const response = await fetch('/api/education');
      if (!response.ok) {
        throw new Error('Failed to fetch education data');
      }
      const educationData = await response.json();
      setData(educationData);
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

      const response = await fetch('/api/education', {
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
    const newEducation: Education = {
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: 0,
      achievements: [''],
    };
    setData([...data, newEducation]);
    setEditingIndex(data.length);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  const handleChange = (index: number, field: keyof Education, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleAchievementChange = (eduIndex: number, achIndex: number, value: string) => {
    const newData = [...data];
    newData[eduIndex].achievements[achIndex] = value;
    setData(newData);
  };

  const addAchievement = (eduIndex: number) => {
    const newData = [...data];
    newData[eduIndex].achievements.push('');
    setData(newData);
  };

  const removeAchievement = (eduIndex: number, achIndex: number) => {
    const newData = [...data];
    newData[eduIndex].achievements.splice(achIndex, 1);
    setData(newData);
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading education data...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1>Education Management</h1>
        <p className="text-muted">
          Manage your academic background, degrees, and achievements.
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
          <strong>Success:</strong> Education data updated successfully!
        </div>
      )}

      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Education Entry
        </button>
      </div>

      <div className="grid" style={{ gap: 'var(--spacing-6)' }}>
        {data.map((education, index) => (
          <div key={index} className="card">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 'var(--spacing-4)'
            }}>
              <h3>{education.institution || 'New Education Entry'}</h3>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
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
                    <label>Institution *</label>
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Degree *</label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => handleChange(index, 'degree', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Field of Study *</label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => handleChange(index, 'field', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Graduation Date *</label>
                    <input
                      type="text"
                      value={education.graduationDate}
                      onChange={(e) => handleChange(index, 'graduationDate', e.target.value)}
                      placeholder="e.g., 2024"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                  <label>GPA</label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    max="4"
                    value={education.gpa}
                    onChange={(e) => handleChange(index, 'gpa', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                    <label>Achievements</label>
                    <button
                      type="button"
                      onClick={() => addAchievement(index)}
                      className="btn btn-secondary btn-sm"
                    >
                      Add Achievement
                    </button>
                  </div>
                  {education.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                        placeholder="Achievement description"
                        style={{ flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => removeAchievement(index, achIndex)}
                        className="btn btn-error btn-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p><strong>Degree:</strong> {education.degree} in {education.field}</p>
                <p><strong>Graduation:</strong> {education.graduationDate}</p>
                <p><strong>GPA:</strong> {education.gpa}</p>
                <div>
                  <strong>Achievements:</strong>
                  <ul style={{ marginTop: 'var(--spacing-2)' }}>
                    {education.achievements.map((achievement, achIndex) => (
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
    </div>
  );
};

export default EducationPage;