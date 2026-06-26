import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IncomingForm } from 'formidable';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const DIST_DIR = path.join(__dirname, '../dist');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/transcribe') {
    const form = new IncomingForm({
      maxFileSize: 50 * 1024 * 1024,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to parse request' }));
        return;
      }

      const file = files.file?.[0] || files.file;
      if (!file) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'No audio file provided' }));
        return;
      }

      try {
        const buffer = fs.readFileSync(file.filepath);
        const blob = new Blob([buffer], { type: file.mimetype || 'audio/webm' });

        const xaiForm = new FormData();
        xaiForm.append('format', 'true');
        xaiForm.append('language', 'en');
        xaiForm.append('file', blob, file.originalFilename || 'recording.webm');

        const xaiRes = await fetch('https://api.x.ai/v1/stt', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.XAI_API_KEY}`,
          },
          body: xaiForm,
        });

        const data = await xaiRes.json();

        if (!xaiRes.ok) {
          res.writeHead(xaiRes.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: data.error || 'Transcription failed' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      } finally {
        if (file.filepath && fs.existsSync(file.filepath)) {
          fs.unlinkSync(file.filepath);
        }
      }
    });
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(DIST_DIR, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
