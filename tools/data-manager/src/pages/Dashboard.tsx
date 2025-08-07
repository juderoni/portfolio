import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dataCategories = [
    { 
      name: 'Personal Info', 
      path: '/personal', 
      description: 'Contact details, title, and summary',
      icon: '👤',
      status: 'ready'
    },
    { 
      name: 'Education', 
      path: '/education', 
      description: 'Academic background and achievements',
      icon: '🎓',
      status: 'ready'
    },
    { 
      name: 'Experience', 
      path: '/experience', 
      description: 'Work history and professional roles',
      icon: '💼',
      status: 'ready'
    },
    { 
      name: 'Skills', 
      path: '/skills', 
      description: 'Technical skills and competencies',
      icon: '🛠️',
      status: 'ready'
    },
    { 
      name: 'Projects', 
      path: '/projects', 
      description: 'Portfolio projects and demos',
      icon: '🚀',
      status: 'ready'
    },
    { 
      name: 'Travel', 
      path: '/travel', 
      description: 'Travel locations, photos, and experiences',
      icon: '🌍',
      status: 'ready'
    },
    { 
      name: 'Activities', 
      path: '/activities', 
      description: 'Extracurricular activities and achievements',
      icon: '🏆',
      status: 'coming-soon'
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1>Portfolio Data Manager</h1>
        <p className="text-muted">
          Manage all your portfolio data in one place. This tool allows you to edit your personal information, 
          experience, projects, and more without touching the code directly.
        </p>
      </div>

      <div className="grid grid-3">
        {dataCategories.map((category) => (
          <div key={category.name} className="card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-4)'
            }}>
              <div style={{ fontSize: 'var(--text-2xl)' }}>
                {category.icon}
              </div>
              <div style={{
                padding: 'var(--spacing-1) var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-medium)',
                background: category.status === 'ready' ? 'var(--success-light)' : 'var(--warning-light)',
                color: category.status === 'ready' ? 'var(--success)' : 'var(--warning)'
              }}>
                {category.status === 'ready' ? 'Ready' : 'Coming Soon'}
              </div>
            </div>
            
            <h3 style={{ marginBottom: 'var(--spacing-2)' }}>
              {category.name}
            </h3>
            
            <p className="text-muted" style={{ 
              marginBottom: 'var(--spacing-4)',
              fontSize: 'var(--text-sm)'
            }}>
              {category.description}
            </p>
            
            {category.status === 'ready' ? (
              <Link 
                to={category.path} 
                className="btn btn-primary btn-sm"
              >
                Manage Data
              </Link>
            ) : (
              <button 
                className="btn btn-secondary btn-sm" 
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <h3>🔧 Development Notes</h3>
        <ul style={{ 
          margin: 0, 
          paddingLeft: 'var(--spacing-6)',
          color: 'var(--text-muted)'
        }}>
          <li>This tool runs on <strong>http://localhost:3001</strong></li>
          <li>API server runs on <strong>http://localhost:3002</strong></li>
          <li>Changes are automatically backed up before saving</li>
          <li>This tool is excluded from the production Docker build</li>
          <li>All data is stored in <code>src/data/</code> TypeScript files</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;