import 'dotenv/config';
import fs from 'fs';
import { IncomingForm } from 'formidable';

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(payload));
}

function readBodyAsBlob(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('error', reject);
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const type = req.headers['content-type'] || '';
      const blob = new Blob([buffer], { type });
      resolve(blob);
    });
  });
}

export function handleTranscribe(req, res, next) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/transcribe') {
    next();
    return;
  }

  const form = new IncomingForm({ maxFileSize: 50 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      sendJson(res, 400, { error: 'Failed to parse request' });
      return;
    }

    const file = files.file?.[0] || files.file;
    if (!file) {
      sendJson(res, 400, { error: 'No audio file provided' });
      return;
    }

    try {
      const apiKey = process.env.XAI_API_KEY?.trim();
      if (!apiKey) {
        sendJson(res, 500, { error: 'XAI_API_KEY is not configured on the server' });
        return;
      }

      const buffer = fs.readFileSync(file.filepath);
      const blob = new Blob([buffer], { type: file.mimetype || 'audio/webm' });

      const xaiForm = new FormData();
      xaiForm.append('format', 'true');
      xaiForm.append('language', 'en');
      xaiForm.append('file', blob, file.originalFilename || 'recording.webm');

      const xaiRes = await fetch('https://api.x.ai/v1/stt', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: xaiForm,
      });

      const data = await xaiRes.json();

      if (!xaiRes.ok) {
        sendJson(res, xaiRes.status, { error: data.error || 'Transcription failed' });
        return;
      }

      sendJson(res, 200, data);
    } catch (e) {
      sendJson(res, 500, { error: e.message });
    } finally {
      if (file.filepath && fs.existsSync(file.filepath)) {
        fs.unlinkSync(file.filepath);
      }
    }
  });
}
