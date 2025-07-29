# Design Document

## Overview

The portfolio website will be a single-page React application with a clean, modern design that showcases Jude Sproul's professional background. The site will use a navigation-based layout with smooth scrolling between sections, optimized for both desktop and mobile viewing. The application will be containerized using Docker with a multi-stage build process and served via Nginx for optimal performance on Google Cloud.

## Architecture

### Frontend Architecture
- **Framework**: React 18 with functional components and hooks
- **Routing**: React Router for client-side navigation between sections
- **Styling**: CSS Modules or Styled Components for component-scoped styling
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React Context API for simple state needs (theme, navigation)

### Deployment Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Google Cloud  │    │   Docker         │    │   Multi-stage   │
│   Run/Compute   │◄───│   Container      │◄───│   Build         │
│   Engine        │    │   (Nginx)        │    │   (Node.js)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Container Strategy
1. **Build Stage**: Node.js 18 Alpine for building React application
2. **Runtime Stage**: Nginx Alpine for serving static assets
3. **Configuration**: Custom nginx.conf for SPA routing and performance

## Components and Interfaces

### Core Components

#### App Component
```jsx
// Main application wrapper
- Navigation component
- Router setup
- Global state providers
- Scroll management
```

#### Navigation Component
```jsx
// Fixed navigation bar
- Logo/Name
- Navigation links (About, Projects, Activities)
- Mobile hamburger menu
- Active section highlighting
```

#### Section Components
```jsx
// About Section
- Hero area with name and title
- Contact information
- Education timeline
- Experience timeline
- Skills grid

// Projects Section
- Project cards grid
- Project details modal/expansion
- Technology tags
- Links to demos/repos

// Activities Section
- Activity cards
- Leadership roles
- Achievements and involvement
```

### Component Interface Design

#### Navigation Interface
```typescript
interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}
```

#### Section Interface
```typescript
interface SectionProps {
  id: string;
  title: string;
  isVisible: boolean;
}
```

#### Project Interface
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  period: string;
  links?: {
    demo?: string;
    repo?: string;
  };
}
```

## Data Models

### Personal Information Model
```typescript
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  title: string;
  summary: string;
}
```

### Education Model
```typescript
interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa: number;
  achievements: string[];
}
```

### Experience Model
```typescript
interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}
```

### Skills Model
```typescript
interface SkillCategory {
  category: string;
  skills: string[];
}
```

## Error Handling

### Client-Side Error Handling
- **React Error Boundaries**: Catch and display user-friendly error messages
- **Network Errors**: Graceful handling of any API calls (if added later)
- **Routing Errors**: 404 handling and fallback routes
- **Image Loading**: Fallback images and loading states

### Build-Time Error Handling
- **TypeScript**: Compile-time type checking
- **ESLint**: Code quality and error prevention
- **Build Failures**: Clear error messages in Docker build process

### Runtime Error Handling
- **Nginx Configuration**: Proper error pages and SPA fallback routing
- **Container Health**: Health checks and restart policies
- **Resource Loading**: Graceful degradation for missing assets

## Testing Strategy

### Unit Testing
- **Framework**: Jest + React Testing Library
- **Coverage**: Component rendering, user interactions, utility functions
- **Mocking**: Mock external dependencies and APIs

### Integration Testing
- **Component Integration**: Test component interactions and data flow
- **Navigation Testing**: Verify routing and section switching
- **Responsive Testing**: Test layout across different screen sizes

### End-to-End Testing
- **Framework**: Playwright or Cypress
- **User Flows**: Complete navigation through all sections
- **Cross-Browser**: Testing on Chrome, Firefox, Safari
- **Mobile Testing**: Touch interactions and responsive behavior

### Docker Testing
- **Build Testing**: Verify multi-stage build process
- **Container Testing**: Test Nginx configuration and static serving
- **Deployment Testing**: Verify container runs correctly in cloud environment

## Design System

### Color Palette
```css
:root {
  --primary: #2563eb;      /* Blue for links and accents */
  --secondary: #64748b;    /* Gray for secondary text */
  --background: #ffffff;   /* White background */
  --surface: #f8fafc;      /* Light gray for cards */
  --text-primary: #1e293b; /* Dark gray for main text */
  --text-secondary: #64748b; /* Medium gray for secondary text */
  --border: #e2e8f0;       /* Light border color */
}
```

### Typography
```css
/* Primary font for headings */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Secondary font for body text */
font-family: 'Inter', system-ui, sans-serif;

/* Font sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

### Layout System
- **Container**: Max-width 1200px, centered with padding
- **Grid**: CSS Grid for project cards, flexbox for navigation
- **Spacing**: 8px base unit (8px, 16px, 24px, 32px, 48px, 64px)
- **Breakpoints**: Mobile (640px), Tablet (768px), Desktop (1024px)

### Animation and Interactions
- **Smooth Scrolling**: CSS scroll-behavior and intersection observer
- **Hover Effects**: Subtle scale and color transitions
- **Loading States**: Skeleton screens and fade-in animations
- **Micro-interactions**: Button press feedback and link hover states