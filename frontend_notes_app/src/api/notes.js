import { supabase } from './supabaseClient';

/**
 * PUBLIC_INTERFACE
 * Fetch all notes ordered by updated_at desc.
 * @returns {Promise<Array>} List of notes
 */
export async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Get a single note by id.
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export async function fetchNote(id) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Create a new note.
 * @param {Object} note 
 * @returns {Promise<Object>}
 */
export async function createNote(note) {
  const { data, error } = await supabase
    .from('notes')
    .insert([note])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Update an existing note.
 * @param {string} id 
 * @param {Object} updates 
 * @returns {Promise<Object>}
 */
export async function updateNote(id, updates) {
  const { data, error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Delete a note.
 * @param {string} id 
 * @returns {Promise<void>}
 */
export async function deleteNote(id) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
