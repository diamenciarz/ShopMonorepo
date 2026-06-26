import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'threadly_notebook';

export default function Notebook() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const text = input.trim();
    if (!text) return;
    setNotes((prev) => [
      ...prev,
      { id: Date.now(), text, createdAt: new Date().toISOString() },
    ]);
    setInput('');
    inputRef.current?.focus();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        await transcribeAudio(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied or not available.');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (blob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Transcription failed');
      }

      const text = data.text?.trim();
      if (text) {
        setNotes((prev) => [
          ...prev,
          { id: Date.now(), text, createdAt: new Date().toISOString() },
        ]);
      }
    } catch (err) {
      alert(err.message);
      console.error(err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: editText.trim() } : n))
    );
    setEditingId(null);
    setEditText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };

  return (
    <div className="container notebook-page">
      <h1 className="notebook-title">Notebook</h1>

      <div className="notebook-input-row">
        <button
          className={`voice-btn${isRecording ? ' recording' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isTranscribing}
          title={isRecording ? 'Stop recording' : 'Voice input'}
        >
          {isRecording ? '●' : '🎤'}
        </button>

        <textarea
          ref={inputRef}
          className="notebook-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Take a note..."
          rows={2}
          disabled={isTranscribing}
        />

        <button
          className="send-btn"
          onClick={addNote}
          disabled={!input.trim() || isTranscribing}
        >
          Send
        </button>
      </div>

      {isTranscribing && (
        <div className="notebook-status">Transcribing audio...</div>
      )}

      <ul className="notebook-list">
        {notes.length === 0 && (
          <li className="notebook-empty">No notes yet. Start typing or use voice.</li>
        )}
        {notes.map((note) => (
          <li key={note.id} className="notebook-item">
            {editingId === note.id ? (
              <div className="notebook-item-edit">
                <textarea
                  className="notebook-edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                  autoFocus
                />
                <div className="notebook-edit-actions">
                  <button
                    className="notebook-save-btn"
                    onClick={() => saveEdit(note.id)}
                  >
                    Save
                  </button>
                  <button
                    className="notebook-cancel-btn"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="notebook-item-text">{note.text}</span>
                <div className="notebook-item-actions">
                  <button
                    className="notebook-icon-btn"
                    onClick={() => startEdit(note)}
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    className="notebook-icon-btn notebook-delete-btn"
                    onClick={() => deleteNote(note.id)}
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
