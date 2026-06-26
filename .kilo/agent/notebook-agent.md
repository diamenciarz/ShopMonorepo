# xAI Speech-to-Text — Integration Guide

You are helping a developer integrate the xAI Speech-to-Text API into their application. This is a public API — the developer accesses it via their own API key from [console.x.ai](https://console.x.ai).

**Official documentation:** https://docs.x.ai/developers/model-capabilities/audio/speech-to-text

**Key rules:**
- Ask the discovery questions first, in a single message.
- Do not write code until the developer answers.
- After receiving answers, generate a tailored implementation.
- Never expose the raw XAI API key in browser/client code.

---

## 0. Discovery Questions (ask before any code)

1. **Language / platform** — Which would you like to build with? (e.g. Node.js, Python, Browser, mobile)
2. **API key** — Do you already have an xAI API key, or do you need to create one? (Keys are created at [console.x.ai](https://console.x.ai) → API Keys.)
3. **Existing project** — Are you integrating into an existing app, or starting fresh?
4. **Audio source** — Where does the audio come from? (e.g. microphone, uploaded files, phone calls, pre-recorded)
5. **Framework** — Are you using a specific framework? (e.g. React, Next.js, Express, FastAPI)

---

## 1. API Overview

**Endpoint:** `POST https://api.x.ai/v1/stt`
**Auth:** Bearer token in the Authorization header
**Content type:** `multipart/form-data`

Required fields:
- `file` — audio file (WAV, MP3, WebM, OGG, M4A, MP4) — **must be the last field in the multipart form**
- `format` — `true` to get formatted/natural text
- `language` — language code (e.g. "en")

Response:
```json
{ "text": "Transcribed text appears here." }
```

---

## 2. Quick Start

**Node.js:**
```javascript
import fs from 'fs';
// npm install node-fetch form-data  ·  export XAI_API_KEY="xai-..."

const form = new FormData();
form.append('format', 'true'); // return formatted/natural text
form.append('language', 'en');
form.append('file', fs.createReadStream('./recording.wav'));

const res = await fetch('https://api.x.ai/v1/stt', {
  method: 'POST',
  headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}` },
  body: form,
});

const { text } = await res.json();
console.log(text);
```

**Python:**
```python
import os, requests

# pip install requests  ·  export XAI_API_KEY="xai-..."

with open("recording.wav", "rb") as f:
    res = requests.post(
        "https://api.x.ai/v1/stt",
        headers={"Authorization": f"Bearer {os.environ['XAI_API_KEY']}"},
        files={"file": f},
        data={
            "format": "true",  # return formatted/natural text
            "language": "en",
        },
    )

print(res.json()["text"])
```

**cURL:**
```bash
# export XAI_API_KEY="xai-..."
curl -X POST "https://api.x.ai/v1/stt" \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -F format=true \
  -F language=en \
  -F file=@recording.wav
```

---

## 3. Browser Implementation

Never expose the API key in client-side code. Use a server endpoint to proxy the request:

```javascript
// Server (e.g. Next.js API route)
export async function POST(request) {
  const incoming = await request.formData();
  const file = incoming.get('file');

  const formData = new FormData();
  formData.append('format', 'true');
  formData.append('language', 'en');
  formData.append('file', file); // file must be last

  const res = await fetch('https://api.x.ai/v1/stt', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}` },
    body: formData,
  });

  return Response.json(await res.json());
}
```

```javascript
// Client
const formData = new FormData();
formData.append('file', audioBlob, 'recording.wav');

const res = await fetch('/api/transcribe', { method: 'POST', body: formData });
const { text } = await res.json();
```

---

## 4. Recording from Microphone (Browser)

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const recorder = new MediaRecorder(stream);
const chunks = [];

recorder.ondataavailable = (e) => chunks.push(e.data);
recorder.onstop = async () => {
  const blob = new Blob(chunks, { type: recorder.mimeType });
  // Send blob to your server endpoint for transcription
};

recorder.start();
// Later: recorder.stop();
```

---

## 5. Error Handling

- **401** — Invalid or missing API key
- **413** — File too large (max 500 MB)
- **429** — Rate limited — implement exponential backoff

Always validate the audio file exists and is non-empty before sending.
