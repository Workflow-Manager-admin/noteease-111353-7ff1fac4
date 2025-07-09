import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
function NoteDetail({ note, editMode, onEdit, onDelete, onSave, onCancel }) {
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (note) setForm({ title: note.title || '', content: note.content || '' });
    else setForm({ title: '', content: '' });
  }, [note]);

  if (!note) {
    return (
      <div className="note-detail-empty">
        <div>Select a note or click <b>+</b> to create a new note.</div>
      </div>
    );
  }

  if (editMode) {
    return (
      <form
        className="note-detail-form"
        onSubmit={e => {
          e.preventDefault();
          onSave({ ...note, ...form });
        }}
      >
        <input
          className="note-input note-title-input"
          placeholder="Title"
          autoFocus
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          maxLength={100}
        />
        <textarea
          className="note-input note-content-input"
          placeholder="Write your note here..."
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          rows={10}
        />
        <div className="note-detail-actions">
          <button type="submit" className="note-btn primary">
            Save
          </button>
          <button type="button" className="note-btn secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="note-detail-viewer">
      <div className="note-detail-header">
        <h2>{note.title || '(Untitled)'}</h2>
        <div className="note-detail-date">
          {note.updated_at ? new Date(note.updated_at).toLocaleString() : ''}
        </div>
      </div>
      <div className="note-detail-content">
        {note.content || <em>No content</em>}
      </div>
      <div className="note-detail-actions">
        <button className="note-btn primary" onClick={onEdit}>Edit</button>
        <button className="note-btn danger" onClick={() => onDelete(note)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;
