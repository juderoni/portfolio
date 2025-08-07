# Portfolio Data Manager

A React-based web interface for managing all portfolio data without directly editing TypeScript files. This tool provides a user-friendly interface to update personal information, experience, projects, travel data, and more.

## 🚀 Quick Start

From the main project root, run:

```bash
npm run data-manager
```

This will:
1. Install dependencies for the data manager
2. Start both the API server (port 3002) and React app (port 3001)
3. Open your browser to http://localhost:3001

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- **Port**: 3001
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (same as main project)
- **Styling**: CSS with custom properties (consistent with main project)

### Backend (Node.js + Express)
- **Port**: 3002
- **API**: RESTful endpoints for each data category
- **File Management**: Direct manipulation of TypeScript data files
- **Backup**: Automatic backup before any changes

## 📁 Project Structure

```
tools/data-manager/
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── index.html                # Entry point
├── server/                   # Express API server
│   ├── index.js             # Server entry point
│   ├── routes/              # API routes for each data type
│   │   ├── personal.js      # Personal info endpoints
│   │   ├── education.js     # Education endpoints
│   │   ├── experience.js    # Experience endpoints
│   │   ├── skills.js        # Skills endpoints
│   │   ├── projects.js      # Projects endpoints
│   │   ├── travel.js        # Travel endpoints
│   │   └── activities.js    # Activities endpoints
│   └── utils/
│       └── fileManager.js   # File read/write utilities
└── src/                     # React frontend
    ├── main.tsx             # React entry point
    ├── App.tsx              # Main app component
    ├── components/          # Reusable components
    │   └── Navigation.tsx   # Tool navigation
    ├── pages/               # Data category pages
    │   ├── Dashboard.tsx    # Overview dashboard
    │   ├── PersonalInfo.tsx # Personal info management
    │   ├── Education.tsx    # Education management
    │   ├── Experience.tsx   # Experience management
    │   ├── Skills.tsx       # Skills management
    │   ├── Projects.tsx     # Projects management
    │   ├── Travel.tsx       # Travel management
    │   └── Activities.tsx   # Activities management
    ├── types/               # Type definitions
    │   └── index.ts         # Same types as main project
    └── styles/              # Styling
        └── globals.css      # Base styles
```

## 🔧 Features

### ✅ Currently Available
- **Personal Info Management**: Update contact details, title, and summary
- **Dashboard**: Overview of all data categories
- **Automatic Backups**: All changes are backed up before saving
- **Type Safety**: Uses the same TypeScript interfaces as the main project
- **Real-time Validation**: Form validation with error handling

### 🚧 Coming Soon
- **Education Management**: Academic background and achievements
- **Experience Management**: Work history and professional roles
- **Skills Management**: Technical skills with drag-and-drop organization
- **Projects Management**: Portfolio projects with technology tags
- **Travel Management**: Location management with photo upload
- **Activities Management**: Extracurricular activities and achievements

## 🛠️ API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/personal` - Get personal information
- `PUT /api/personal` - Update personal information
- `GET /api/education` - Get education data
- `PUT /api/education` - Update education data
- `GET /api/experience` - Get experience data
- `PUT /api/experience` - Update experience data
- `GET /api/skills` - Get skills data
- `PUT /api/skills` - Update skills data
- `GET /api/projects` - Get projects data
- `PUT /api/projects` - Update projects data
- `GET /api/travel` - Get travel data
- `PUT /api/travel` - Update travel data
- `GET /api/activities` - Get activities data
- `PUT /api/activities` - Update activities data

## 💾 Data Management

### File Structure
The tool directly modifies TypeScript files in `src/data/`:
- `personalInfo.ts` - Contact information and summary
- `education.ts` - Academic background
- `experience.ts` - Work history
- `skills.ts` - Technical skills
- `projects.ts` - Portfolio projects
- `travel.ts` - Travel locations and experiences
- `activities.ts` - Extracurricular activities

### Backup System
- Automatic backups are created before any changes
- Backups are stored in `tools/data-manager/server/backups/`
- Backup files include timestamps for easy identification
- Format: `{filename}_{timestamp}.ts`

### Type Safety
- Uses the same TypeScript interfaces as the main project
- Validates data structure before saving
- Prevents invalid data from being written to files

## 🚫 Production Exclusion

This tool is completely excluded from the production build:
- Added to `.dockerignore` to exclude from Docker builds
- Separate `package.json` with its own dependencies
- No impact on main project bundle size or performance

## 🔍 Development

### Manual Setup
If you prefer to set up manually:

```bash
# Navigate to the tool directory
cd tools/data-manager

# Install dependencies
npm install

# Start the development servers
npm run dev
```

### Individual Commands
```bash
# Start only the React frontend
npm run client

# Start only the API server
npm run server

# Build for production (if needed)
npm run build
```

## 🐛 Troubleshooting

### Common Issues

**Port conflicts**: If ports 3001 or 3002 are in use:
- Check what's running on those ports
- Kill conflicting processes or change ports in the configuration

**File permission errors**: Ensure the tool has write access to:
- `src/data/` directory (for updating data files)
- `tools/data-manager/server/backups/` (for creating backups)

**TypeScript parsing errors**: If data files have complex structures:
- The file parser uses a simplified approach
- Complex TypeScript features might need manual handling

### Getting Help

1. Check the browser console for frontend errors
2. Check the terminal for API server errors
3. Verify that data files exist and are properly formatted
4. Ensure all dependencies are installed

## 🎯 Usage Tips

1. **Always backup important data** before making bulk changes
2. **Test changes** by viewing the main portfolio site
3. **Use descriptive commit messages** when committing data changes
4. **Keep the tool running** while making multiple edits for efficiency
5. **Check validation messages** to ensure data integrity

## 🔮 Future Enhancements

- Photo upload and management for travel section
- Bulk import/export functionality
- Data validation with custom rules
- Real-time preview of changes
- Undo/redo functionality
- Advanced text editing with rich text support
- Integration with version control for change tracking