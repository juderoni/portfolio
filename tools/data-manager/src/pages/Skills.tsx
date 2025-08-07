import { useState, useEffect } from 'react';
import type { SkillCategory } from '../types';

const SkillsPage = () => {
  const [data, setData] = useState<SkillCategory[]>([]);
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
      const response = await fetch('/api/skills');
      if (!response.ok) {
        throw new Error('Failed to fetch skills data');
      }
      const skillsData = await response.json();
      setData(skillsData);
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

      const response = await fetch('/api/skills', {
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
    const newCategory: SkillCategory = {
      category: '',
      skills: [''],
    };
    setData([...data, newCategory]);
    setEditingIndex(data.length);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  const handleChange = (index: number, field: keyof SkillCategory, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleSkillChange = (catIndex: number, skillIndex: number, value: string) => {
    const newData = [...data];
    newData[catIndex].skills[skillIndex] = value;
    setData(newData);
  };

  const addSkill = (catIndex: number) => {
    const newData = [...data];
    newData[catIndex].skills.push('');
    setData(newData);
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const newData = [...data];
    newData[catIndex].skills.splice(skillIndex, 1);
    setData(newData);
  };

  const moveCategory = (index: number, direction: 'up' | 'down') => {
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
        <p>Loading skills data...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1>Skills Management</h1>
        <p className="text-muted">
          Organize your technical skills by category. You can reorder categories and manage individual skills.
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
          <strong>Success:</strong> Skills data updated successfully!
        </div>
      )}

      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Skill Category
        </button>
      </div>

      <div className="grid" style={{ gap: 'var(--spacing-6)' }}>
        {data.map((category, index) => (
          <div key={index} className="card">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 'var(--spacing-4)'
            }}>
              <h3>{category.category || 'New Skill Category'}</h3>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                <button
                  onClick={() => moveCategory(index, 'up')}
                  className="btn btn-secondary btn-sm"
                  disabled={index === 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveCategory(index, 'down')}
                  className="btn btn-secondary btn-sm"
                  disabled={index === data.length - 1}
                  title="Move down"
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
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                  <label>Category Name *</label>
                  <input
                    type="text"
                    value={category.category}
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                    placeholder="e.g., Programming Languages"
                    required
                  />
                </div>

                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: 'var(--spacing-2)' 
                  }}>
                    <label>Skills</label>
                    <button
                      type="button"
                      onClick={() => addSkill(index)}
                      className="btn btn-secondary btn-sm"
                    >
                      Add Skill
                    </button>
                  </div>
                  <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, skillIndex, e.target.value)}
                          placeholder="Skill name"
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeSkill(index, skillIndex)}
                          className="btn btn-error btn-sm"
                          disabled={category.skills.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-muted" style={{ marginBottom: 'var(--spacing-2)' }}>
                  {category.skills.length} skills
                </p>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 'var(--spacing-2)' 
                }}>
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      style={{
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        padding: 'var(--spacing-1) var(--spacing-2)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-sm)',
                        border: '1px solid var(--primary)'
                      }}
                    >
                      {skill}
                    </span>
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
          <li>Use the ↑ ↓ buttons to reorder skill categories</li>
          <li>Group related skills together (e.g., "Programming Languages", "Web Technologies")</li>
          <li>Keep skill names concise and recognizable</li>
          <li>Order skills within categories by proficiency or importance</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsPage;