import express from 'express';
import { readDataFile, writeDataFile, parseDataFile, generateDataFile } from '../utils/fileManager.js';

const router = express.Router();
const FILENAME = 'personalInfo.ts';
const EXPORT_NAME = 'personalInfo';
const TYPE_NAME = 'PersonalInfo';
const IMPORT_PATH = '../types';

// GET /api/personal - Get personal info
router.get('/', async (req, res) => {
  try {
    const content = await readDataFile(FILENAME);
    const data = parseDataFile(content, EXPORT_NAME);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/personal - Update personal info
router.put('/', async (req, res) => {
  try {
    const newData = req.body;
    
    // Basic validation
    const requiredFields = ['name', 'email', 'phone', 'linkedin', 'title', 'summary'];
    for (const field of requiredFields) {
      if (!newData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    
    // Generate new file content
    const fileContent = generateDataFile(newData, EXPORT_NAME, TYPE_NAME, IMPORT_PATH);
    
    // Write to file
    await writeDataFile(FILENAME, fileContent);
    
    res.json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;