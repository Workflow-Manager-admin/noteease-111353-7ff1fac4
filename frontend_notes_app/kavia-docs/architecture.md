# Notes App Frontend: Architecture Documentation

## Overview

The Notes App frontend is a modern, minimalistic single-page React application that enables users to create, view, edit, and delete notes. It features a clean responsive interface and integrates seamlessly with a Supabase backend for data storage and retrieval. The app’s structure emphasizes both simplicity and extensibility, making it easy to understand, maintain, and expand.

## High-level Architecture

The app is composed of several React components orchestrated by a top-level `App` component. All note data is managed using Supabase as a backend-as-a-service. The data flow is unidirectional: user actions trigger state changes, which in turn drive UI updates and API interactions.

```
graph TD
    A[User Actions<br/>(UI)] --> B(App.js)
    B -- Reads/Writes Data --> C(Notes API<br/>/api/notes.js)
    C --Supabase Queries--> D[supabaseClient.js]
    D --Supabase API--> E["Supabase Database<br/>(Notes Table)"]
    B --Renders Data--> F[UI Components<br/>(NotesList, NoteDetail,<br/>FloatingActionButton)]
```

## Component Breakdown

### Main Entrypoint

- **index.js**
  - Renders the `App` component inside React’s root and applies the global context.

### Top-level Container

- **App.js**
  - Maintains application-level state: notes array, selected note, edit mode, loading status.
  - Handles all CRUD interactions and data refresh logic.
  - Coordinates component interactions and passes handlers/props to children.
  - Manages theme (enforced light mode, easily extensible).

### UI Components

- **NotesList.js**
  - Displays all notes in a scrollable sidebar.
  - Handles loading and empty states.
  - Notifies `App` of note selection.

- **NoteDetail.js**
  - Displays the currently selected note in view or edit mode.
  - Allows editing, saving, deleting notes.
  - Handles cancel and transitions between edit/view state.

- **FloatingActionButton.js**
  - Renders a material-inspired "+" button.
  - Triggers the creation of a new note (notifies `App`).

### API Layer

- **src/api/notes.js**
  - Provides functions to fetch, create, update, and delete notes.
  - These functions use Supabase for all backend operations, returning Promises.

- **src/api/supabaseClient.js**
  - Initializes and exports a configured Supabase client using project keys.

## Supabase Integration

- **supabaseClient.js** wraps Supabase initialization:
  - Uses project URL and anon key to provide a `supabase` client.
- **notes.js** API functions:
  - **fetchNotes:** Retrieves all notes for the logged-in user, ordered by most recently updated.
  - **fetchNote:** Retrieves a single note by its id.
  - **createNote:** Inserts a new note and returns the created row.
  - **updateNote:** Updates a note (title/content) given its id.
  - **deleteNote:** Deletes a note given its id.

All these interact with a `notes` table on the Supabase backend.

## Data Flow

The main data flow in the app is as follows:

1. **Initialization**
   - On startup, `App` loads all notes from Supabase (via `fetchNotes`).
   - The state is updated with the complete notes list.

2. **Displaying Data**
   - Notes are presented in `NotesList` (sidebar).
   - Selecting a note displays its details in `NoteDetail`.

3. **Creating a Note**
   - Clicking the floating "+" button triggers "add note" in `App`, opening `NoteDetail` in edit mode.
   - After the user saves, `createNote` is called; on success, state is updated and the new note is selected.

4. **Editing a Note**
   - Pressing "Edit" in detail view switches `NoteDetail` to edit mode.
   - Saving triggers `updateNote`; on success, the updated note replaces the old note in state.

5. **Deleting a Note**
   - Pressing "Delete" removes the note via `deleteNote`; the item is removed from state.

6. **Error Handling**
   - If any API operation fails, an alert notifies the user (these are synchronous for now).

**Summary Mermaid Data Flow Diagram:**
```
sequenceDiagram
    participant User
    participant App
    participant NotesAPI
    participant Supabase
    User->>App: UI actions (add/edit/delete/select)
    App->>NotesAPI: fetchNotes / createNote / updateNote / deleteNote
    NotesAPI->>Supabase: Query/Mutation on 'notes'
    Supabase-->>NotesAPI: Response (data/error)
    NotesAPI-->>App: Promise resolved or error
    App-->>User: UI update or alert
```

## UI and UX Design

- **Styling:** Modern CSS variables with a light mode color palette, accent/fab color (yellow), and brand blue as primary.
- **Responsiveness:** App and sidebar collapse/resize for mobile screens.
- **Minimalistic:** No external UI frameworks, only React + CSS.

## Summary

This notes app demonstrates a robust but straightforward React architecture: simple state management in a root container, decoupled presentational components, a clean and direct API boundary, and stateless backend powered by Supabase. The design favors readability, minimalism, and modern best practices.

---
**Key Files Referenced:**
- `src/App.js`
- `src/components/NotesList.js`
- `src/components/NoteDetail.js`
- `src/components/FloatingActionButton.js`
- `src/api/notes.js`
- `src/api/supabaseClient.js`
- `src/index.js`

