import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'blue' | 'tan' | 'green' | 'purple';

export interface ThemeConfig {
  mode: ThemeMode;
  colorScheme: ColorScheme;
}

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  toggleMode: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: ThemeConfig = {
  mode: 'system',
  colorScheme: 'blue'
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setThemeState(parsedTheme);
      } catch (error) {
        console.error('Error parsing saved theme:', error);
      }
    }
  }, []);

  // Get the actual theme mode (resolve 'system' to 'light' or 'dark')
  const getResolvedMode = (mode: ThemeMode): 'light' | 'dark' => {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  };

  // Apply theme to document and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    const resolvedMode = getResolvedMode(theme.mode);
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark', 'system', 'blue', 'tan', 'green', 'purple');
    
    // Add current theme classes (use resolved mode for CSS)
    root.classList.add(resolvedMode, theme.colorScheme);
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', JSON.stringify(theme));
  }, [theme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme.mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Force re-render by updating the theme state
      setThemeState(prev => ({ ...prev }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme.mode]);

  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
  };

  const toggleMode = () => {
    setThemeState(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setThemeState(prev => ({
      ...prev,
      colorScheme: scheme
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleMode, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};