const fs = require('node:fs');
const path = require('node:path');
const loadEnvFile = require('./load-env');

loadEnvFile();

const apiBaseUrl = process.env.VITE_API_URL || '/api/';
if (!apiBaseUrl.startsWith('/') && !/^https?:\/\//i.test(apiBaseUrl)) {
  throw new Error('VITE_API_URL debe ser una ruta absoluta o una URL HTTP(S).');
}

const output = `window.APP_CONFIG = Object.freeze({ apiBaseUrl: ${JSON.stringify(apiBaseUrl)} });\n`;
fs.writeFileSync(path.join(__dirname, 'config.js'), output);
