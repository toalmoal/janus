import { mkdirSync } from 'fs';
import { join } from 'path';

// Ensure test directories exist for logger
try {
  mkdirSync(join(__dirname, '../shared/var/logs'), { recursive: true });
} catch (e) {
  // Directory might already exist
}

// Set test environment
process.env.NODE_ENV = 'development';
