import { useState, useEffect } from 'react';
import type { PersonalInfo } from '../types';

const PersonalInfoPage = () => {
  const [data, setData] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/personal');
      if (!response.ok) {
        throw new Error('Failed to fetch personal info');
      }
      const personalInfo = await response.json();
      setData(personalInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await fetch('/api/personal', {
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
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save data');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading personal information...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center">
        <p className="text-error">Failed to load personal information</p>
        <button onClick={fetchData} className="btn btn-primary mt-4">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1>Personal Information</h1>
        <p className="text-muted">
          Update your contact details, professional title, and summary.
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
          <strong>Success:</strong> Personal information updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div>
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="title">Professional Title *</label>
            <input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ marginTop: 'var(--spacing-6)' }}>
          <label htmlFor="linkedin">LinkedIn URL *</label>
          <input
            id="linkedin"
            type="url"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 'var(--spacing-6)' }}>
          <label htmlFor="summary">Professional Summary *</label>
          <textarea
            id="summary"
            rows={4}
            value={data.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            required
            style={{ resize: 'vertical' }}
          />
        </div>

        <div style={{ 
          marginTop: 'var(--spacing-8)',
          display: 'flex',
          gap: 'var(--spacing-4)',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={fetchData}
            className="btn btn-secondary"
            disabled={saving}
          >
            Reset Changes
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="card mt-8">
        <h4>💡 Tips</h4>
        <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
          <li>Changes are automatically backed up before saving</li>
          <li>Use a professional email address for contact</li>
          <li>Keep your summary concise but comprehensive</li>
          <li>LinkedIn URL should be your full profile URL</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfoPage;