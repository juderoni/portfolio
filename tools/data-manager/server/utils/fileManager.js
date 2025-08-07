import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the main project's data directory
const DATA_DIR = path.resolve(__dirname, '../../../../src/data');
const BACKUP_DIR = path.resolve(__dirname, '../backups');

// Ensure backup directory exists
async function ensureBackupDir() {
  try {
    await fs.access(BACKUP_DIR);
  } catch {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  }
}

// Create backup of a file before modifying
async function createBackup(filename) {
  await ensureBackupDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = `${filename.replace('.ts', '')}_${timestamp}.ts`;
  const sourcePath = path.join(DATA_DIR, filename);
  const backupPath = path.join(BACKUP_DIR, backupName);
  
  try {
    const content = await fs.readFile(sourcePath, 'utf8');
    await fs.writeFile(backupPath, content);
    console.log(`✅ Backup created: ${backupName}`);
  } catch (error) {
    console.error(`❌ Failed to create backup for ${filename}:`, error.message);
    throw error;
  }
}

// Read a data file
async function readDataFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`❌ Failed to read ${filename}:`, error.message);
    throw error;
  }
}

// Write a data file with backup
async function writeDataFile(filename, content) {
  try {
    // Create backup first
    await createBackup(filename);
    
    // Write new content
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, content);
    console.log(`✅ Updated ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to write ${filename}:`, error.message);
    throw error;
  }
}

// Parse TypeScript data file to extract the exported data
function parseDataFile(content, exportName) {
  try {
    // Find the export statement using a more flexible regex
    const exportRegex = new RegExp(`export const ${exportName}[^=]*=([\\s\\S]*?);\\s*$`, 'm');
    const match = content.match(exportRegex);
    
    if (!match) {
      throw new Error(`Export ${exportName} not found`);
    }
    
    let dataContent = match[1].trim();
    
    // Use eval approach directly since JSON conversion is complex with apostrophes
    const result = eval(`(${dataContent})`);
    return result;
  } catch (error) {
    console.error('Failed to parse data file:', error.message);
    console.error('Content that failed to parse:', content.substring(0, 500) + '...');
    throw new Error(`Failed to parse data file: ${error.message}`);
  }
}

// Generate TypeScript file content from data
function generateDataFile(data, exportName, typeName, importPath, importType = null) {
  // Custom function to convert data to TypeScript format with proper escaping
  function toTypeScriptString(obj, indent = 0) {
    const spaces = '  '.repeat(indent);
    
    if (typeof obj === 'string') {
      // Escape apostrophes and use single quotes for strings
      return `'${obj.replace(/'/g, "\\'")}'`;
    } else if (typeof obj === 'number' || typeof obj === 'boolean') {
      return obj.toString();
    } else if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      const items = obj.map(item => toTypeScriptString(item, indent + 1));
      return `[\n${spaces}  ${items.join(`,\n${spaces}  `)},\n${spaces}]`;
    } else if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj);
      if (entries.length === 0) return '{}';
      
      const props = entries.map(([key, value]) => {
        return `${spaces}  ${key}: ${toTypeScriptString(value, indent + 1)}`;
      });
      return `{\n${props.join(',\n')},\n${spaces}}`;
    }
    return 'null';
  }
  
  const tsString = toTypeScriptString(data);
  
  // Use importType if provided, otherwise use typeName for import
  const typeToImport = importType || typeName;
  
  return `import type { ${typeToImport} } from '${importPath}';

export const ${exportName}: ${typeName} = ${tsString};
`;
}

export {
  readDataFile,
  writeDataFile,
  parseDataFile,
  generateDataFile,
  createBackup
};