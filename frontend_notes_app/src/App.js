import React, { useEffect, useState } from 'react';
import './App.css';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import FloatingActionButton from './components/FloatingActionButton';
import { fetchNotes, createNote, updateNote, deleteNote } from './api/notes';

// PUBLIC_INTERFACE
function App() {
  // Theme (light enforced as per spec, but logic kept for future toggles)
  const [theme] = useState('light');

  // Notes state
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch notes list
  const refreshNotes = async () => {
    setLoading(true);
    try {
      const n = await fetchNotes();
      setNotes(n);
    } catch (e) {
      alert('Failed to load notes: ' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    refreshNotes();
  }, [theme]);

  // Select a note for detail or edit
  const handleSelect = (note) => {
    setSelectedNote(note);
    setEditMode(false);
  };

  // Add new note (open empty detail in edit mode)
  const handleAdd = () => {
    setSelectedNote({ title: '', content: '' });
    setEditMode(true);
  };

  // Save note (create or update)
  const handleSave = async (note) => {
    setLoading(true);
    try {
      if (!note.id) {
        const created = await createNote({
          title: note.title,
          content: note.content,
        });
        setNotes([created, ...notes]);
        setSelectedNote(created);
      } else {
        const updated = await updateNote(note.id, {
          title: note.title,
          content: note.content,
        });
        setNotes(notes.map(n => n.id === note.id ? updated : n));
        setSelectedNote(updated);
      }
      setEditMode(false);
    } catch (e) {
      alert('Failed to save note: ' + e.message);
    }
    setLoading(false);
  };

  // Delete note
  const handleDelete = async (note) => {
    if (!note.id) return;
    if (!window.confirm('Delete this note?')) return;
    setLoading(true);
    try {
      await deleteNote(note.id);
      setNotes(notes.filter(n => n.id !== note.id));
      setSelectedNote(null);
      setEditMode(false);
    } catch (e) {
      alert('Failed to delete note: ' + e.message);
    }
    setLoading(false);
  };

  // Edit button triggers edit mode
  const handleEdit = () => {
    setEditMode(true);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditMode(false);
    if (selectedNote && selectedNote.id) {
      // revert view mode for existing note
      setSelectedNote(notes.find(n => n.id === selectedNote.id));
    } else {
      setSelectedNote(null);
    }
  };

  return (
    <div className="notes-app-container">
      <header className="notes-app-header">
        <h1 className="app-title">NoteEase</h1>
      </header>
      <main className="notes-main">
        <aside className="notes-sidebar">
          <NotesList
            notes={notes}
            loading={loading}
            selectedId={selectedNote ? selectedNote.id : null}
            onSelect={handleSelect}
          />
        </aside>
        <section className="notes-detail-view">
          <NoteDetail
            note={selectedNote}
            editMode={editMode}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </section>
        <FloatingActionButton onClick={handleAdd} tooltip="Add Note" />
      </main>
      <footer className="notes-footer">
        <span>Minimal & Modern Notes App &copy; 2024</span>
      </footer>
    </div>
  );
}

export default App;
