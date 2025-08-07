import { useState, useEffect } from 'react';
import type { Project } from '../types';

const ProjectsPage = () => {
  const [data, setData] = useState<Project[]>([]);
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
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects data');
      }
      const projectsData = await response.json();
      setData(projectsData);
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

      const response = await fetch('/api/projects', {
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
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      technologies: [''],
      period: '',
      links: {
        demo: '',
        repo: '',
      },
    };
    setData([newProject, ...data]); // Add to beginning
    setEditingIndex(0);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      if (editingIndex === index) {
        setEditingIndex(null);
      }
    }
  };

  const handleChange = (index: number, field: keyof Project, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const handleLinkChange = (index: number, linkType: 'demo' | 'repo', value: string) => {
    const newData = [...data];
    if (!newData[index].links) {
      newData[index].links = {};
    }
    newData[index].links![linkType] = value;
    setData(newData);
  };

  const handleTechnologyChange = (projIndex: number, techIndex: number, value: string) => {
    const newData = [...data];
    newData[projIndex].technologies[techIndex] = value;
    setData(newData);
  };

  const addTechnology = (projIndex: number) => {
    const newData = [...data];
    newData[projIndex].technologies.push('');
    setData(newData);
  };

  const removeTechnology = (projIndex: number, techIndex: number) => {
    const newData = [...data];
    newData[projIndex].technologies.splice(techIndex, 1);
    setData(newData);
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
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
        <p>Loading projects data...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1>Projects Management</h1>
        <p className="text-muted">
          Manage your portfolio projects, including descriptions, technologies, and links.
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
          <strong>Success:</strong> Projects data updated successfully!
        </div>
      )}

      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Project
        </button>
      </div>

      <div className="grid" style={{ gap: 'var(--spacing-6)' }}>
        {data.map((project, index) => (
          <div key={project.id} className="card">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: 'var(--spacing-4)'
            }}>
              <div>
                <h3>{project.title || 'New Project'}</h3>
                <p className="text-muted" style={{ margin: 0 }}>
                  {project.period} • {project.technologies.filter(t => t).length} technologies
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                <button
                  onClick={() => moveProject(index, 'up')}
                  className="btn btn-secondary btn-sm"
                  disabled={index === 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveProject(index, 'down')}
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
                <div className="grid grid-2">
                  <div>
                    <label>Project Title *</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Time Period *</label>
                    <input
                      type="text"
                      value={project.period}
                      onChange={(e) => handleChange(index, 'period', e.target.value)}
                      placeholder="e.g., 2023-2024"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                  <label>Project ID *</label>
                  <input
                    type="text"
                    value={project.id}
                    onChange={(e) => handleChange(index, 'id', e.target.value)}
                    placeholder="Unique identifier (kebab-case)"
                    required
                  />
                </div>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                  <label>Description *</label>
                  <textarea
                    rows={4}
                    value={project.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Detailed description of the project"
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
                    <label>Technologies Used</label>
                    <button
                      type="button"
                      onClick={() => addTechnology(index)}
                      className="btn btn-secondary btn-sm"
                    >
                      Add Technology
                    </button>
                  </div>
                  <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
                          placeholder="Technology name"
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeTechnology(index, techIndex)}
                          className="btn btn-error btn-sm"
                          disabled={project.technologies.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'var(--spacing-4)' }}>
                  <h4>Project Links</h4>
                  <div className="grid grid-2">
                    <div>
                      <label>Demo URL</label>
                      <input
                        type="url"
                        value={project.links?.demo || ''}
                        onChange={(e) => handleLinkChange(index, 'demo', e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label>Repository URL</label>
                      <input
                        type="url"
                        value={project.links?.repo || ''}
                        onChange={(e) => handleLinkChange(index, 'repo', e.target.value)}
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ marginBottom: 'var(--spacing-3)' }}>
                  {project.description}
                </p>
                
                <div style={{ marginBottom: 'var(--spacing-3)' }}>
                  <strong>Technologies:</strong>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 'var(--spacing-2)',
                    marginTop: 'var(--spacing-1)'
                  }}>
                    {project.technologies.filter(t => t).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        style={{
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          padding: 'var(--spacing-1) var(--spacing-2)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--text-sm)',
                          border: '1px solid var(--primary)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(project.links?.demo || project.links?.repo) && (
                  <div>
                    <strong>Links:</strong>
                    <div style={{ 
                      display: 'flex', 
                      gap: 'var(--spacing-3)',
                      marginTop: 'var(--spacing-1)'
                    }}>
                      {project.links?.demo && (
                        <a 
                          href={project.links.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                        >
                          View Demo
                        </a>
                      )}
                      {project.links?.repo && (
                        <a 
                          href={project.links.repo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                        >
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                )}
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
          <li>Use descriptive project IDs in kebab-case (e.g., "my-awesome-app")</li>
          <li>Order projects by importance or recency using ↑ ↓ buttons</li>
          <li>Include specific technologies and frameworks used</li>
          <li>Add demo links when projects are publicly accessible</li>
          <li>Keep descriptions focused on key features and impact</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsPage;