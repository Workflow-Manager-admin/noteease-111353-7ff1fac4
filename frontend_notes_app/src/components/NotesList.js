import React from 'react';

// PUBLIC_INTERFACE
function NotesList({ notes, loading, selectedId, onSelect }) {
  return (
    <div className="notes-list">
      <div className="notes-list-header">My Notes</div>
      {loading && <div className="notes-list-loading">Loading...</div>}
      {!loading && notes.length === 0 && (
        <div className="notes-list-empty">No notes yet.</div>
      )}
      <ul className="notes-list-ul">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`notes-list-item${selectedId === note.id ? ' selected' : ''}`}
            onClick={() => onSelect(note)}
          >
            <div className="list-note-title">{note.title || '(Untitled)'}</div>
            <div className="list-note-date">
              {note.updated_at ? new Date(note.updated_at).toLocaleString() : ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
