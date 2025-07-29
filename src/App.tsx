import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation, LoadingSpinner, ScrollToTop } from './components';
import { About, Projects, Travel } from './pages';
import { useScrollToTop } from './hooks/useScrollToTop';
import './App.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const location = useLocation();
  
  useScrollToTop();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add page transition effect
    setPageTransition(true);
    const timer = setTimeout(() => {
      setPageTransition(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" />
        <p className="loading-text">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation />
      <main className={`main-content ${pageTransition ? 'page-transitioning' : ''}`}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/travel" element={<Travel />} />
        </Routes>
      </main>
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
