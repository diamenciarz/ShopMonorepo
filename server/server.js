import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleTranscribe } from './handler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const DIST_DIR = path.join(__dirname, '../dist');

if (!process.env.XAI_API_KEY) {
  console.warn('Warning: XAI_API_KEY environment variable is not set. Speech-to-text will fail.');
}

const server = http.createServer((req, res) => {
  handleTranscribe(req, res, () => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(DIST_DIR, filePath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      res.statusCode = 200;
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
