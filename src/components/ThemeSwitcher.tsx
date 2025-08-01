import { useState, useEffect, useRef } from 'react';
import { useTheme, type ThemeMode, type ColorScheme } from '../contexts/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const colorSchemes: { value: ColorScheme; label: string; preview: string }[] = [
    { value: 'blue', label: 'Ocean Blue', preview: '#2563eb' },
    { value: 'tan', label: 'Desert Sand', preview: '#d97706' },
    { value: 'green', label: 'Forest Green', preview: '#059669' },
    { value: 'purple', label: 'Royal Purple', preview: '#7c3aed' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleThemeChange = (mode: ThemeMode, colorScheme: ColorScheme) => {
    setTheme({ mode, colorScheme });
    // Don't close the dropdown when selecting options
  };

  return (
    <div className="theme-switcher" ref={dropdownRef}>
      <button
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme settings"
        title="Change theme"
      >
        {theme.mode === 'light' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-section">
            <h4>Mode</h4>
            <div className="theme-modes">
              <button
                className={`mode-button ${theme.mode === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light', theme.colorScheme)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
                Light
              </button>
              <button
                className={`mode-button ${theme.mode === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark', theme.colorScheme)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
                </svg>
                Dark
              </button>
              <button
                className={`mode-button ${theme.mode === 'system' ? 'active' : ''}`}
                onClick={() => handleThemeChange('system', theme.colorScheme)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12a3 3 0 11-6 0 3 3 0 016 0zM21 12a3 3 0 11-6 0 3 3 0 016 0zM12 21a3 3 0 100-6 3 3 0 000 6zM12 9a3 3 0 100-6 3 3 0 000 6z"/>
                </svg>
                System
              </button>
            </div>
          </div>

          <div className="theme-section">
            <h4>Color Scheme</h4>
            <div className="color-schemes">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.value}
                  className={`color-button ${theme.colorScheme === scheme.value ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme.mode, scheme.value)}
                  title={scheme.label}
                >
                  <div 
                    className="color-preview" 
                    style={{ backgroundColor: scheme.preview }}
                  />
                  <span>{scheme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="theme-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;