import express from 'express';
import { readDataFile, writeDataFile, parseDataFile, generateDataFile } from '../utils/fileManager.js';

const router = express.Router();
const FILENAME = 'experience.ts';
const EXPORT_NAME = 'experience';
const TYPE_NAME = 'Experience[]';
const IMPORT_TYPE = 'Experience';
const IMPORT_PATH = '../types';

// GET /api/experience - Get experience data
router.get('/', async (req, res) => {
  try {
    const content = await readDataFile(FILENAME);
    const data = parseDataFile(content, EXPORT_NAME);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/experience - Update experience data
router.put('/', async (req, res) => {
  try {
    const newData = req.body;
    
    // Basic validation
    if (!Array.isArray(newData)) {
      return res.status(400).json({ error: 'Experience data must be an array' });
    }
    
    // Generate new file content
    const fileContent = generateDataFile(newData, EXPORT_NAME, TYPE_NAME, IMPORT_PATH, IMPORT_TYPE);
    
    // Write to file
    await writeDataFile(FILENAME, fileContent);
    
    res.json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;