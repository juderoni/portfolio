import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import personalRoutes from './routes/personal.js';
import educationRoutes from './routes/education.js';
import experienceRoutes from './routes/experience.js';
import skillsRoutes from './routes/skills.js';
import projectsRoutes from './routes/projects.js';
import travelRoutes from './routes/travel.js';
import activitiesRoutes from './routes/activities.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/personal', personalRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/activities', activitiesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Data Manager API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Data Manager API running on http://localhost:${PORT}`);
});