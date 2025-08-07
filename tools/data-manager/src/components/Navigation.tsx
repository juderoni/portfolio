import { Link, useLocation } from 'react-router-dom';
import type { DataCategory } from '../types';

const dataCategories: DataCategory[] = [
  { id: 'dashboard', name: 'Dashboard', path: '/', description: 'Overview of all data' },
  { id: 'personal', name: 'Personal Info', path: '/personal', description: 'Contact details and summary' },
  { id: 'education', name: 'Education', path: '/education', description: 'Academic background' },
  { id: 'experience', name: 'Experience', path: '/experience', description: 'Work history' },
  { id: 'skills', name: 'Skills', path: '/skills', description: 'Technical skills' },
  { id: 'projects', name: 'Projects', path: '/projects', description: 'Portfolio projects' },
  { id: 'travel', name: 'Travel', path: '/travel', description: 'Travel locations and photos' },
  { id: 'activities', name: 'Activities', path: '/activities', description: 'Extracurricular activities' },
];

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: 'var(--spacing-4) 0',
      marginBottom: 'var(--spacing-8)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 'var(--spacing-4)'
        }}>
          <h1 style={{ margin: 0, color: 'var(--primary)' }}>
            Portfolio Data Manager
          </h1>
          <div style={{ 
            fontSize: 'var(--text-sm)', 
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-2)'
          }}>
            <span>🔧</span>
            <span>Development Tool</span>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-2)',
          flexWrap: 'wrap'
        }}>
          {dataCategories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)',
                transition: 'all var(--transition)',
                background: isActive(category.path) ? 'var(--primary)' : 'transparent',
                color: isActive(category.path) ? 'white' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: isActive(category.path) ? 'var(--primary)' : 'var(--border)'
              }}
              onMouseEnter={(e) => {
                if (!isActive(category.path)) {
                  e.currentTarget.style.background = 'var(--surface-hover)';
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(category.path)) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }
              }}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;