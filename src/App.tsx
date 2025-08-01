import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation, LoadingSpinner, ScrollToTop, ErrorBoundary, Footer } from './components';
import { ThemeProvider } from './contexts/ThemeContext';
import { useScrollToTop } from './hooks/useScrollToTop';
import './styles/themes.css';
import './App.css';

// Lazy load page components for code splitting
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Travel = lazy(() => import('./pages/Travel'));

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
      <ErrorBoundary>
        <Navigation />
        <main className={`main-content ${pageTransition ? 'page-transitioning' : ''}`}>
          <ErrorBoundary>
            <Suspense fallback={
              <div className="page-loading">
                <LoadingSpinner size="medium" />
                <p>Loading page...</p>
              </div>
            }>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/travel" element={<Travel />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <ScrollToTop />
      </ErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
