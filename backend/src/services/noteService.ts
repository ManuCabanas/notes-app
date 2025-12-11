import { NoteUpsertDTO } from '../types/note';
import * as noteRepository from '../repositories/noteRepository';

export async function createNote({ title, content }: NoteUpsertDTO) {
  if (!title || title.trim() === '') {
    throw new Error('Title is required.');
  }

  return noteRepository.create({
    title, 
    content
  });
}

export async function listActiveNotes() {
  return noteRepository.findMany({archived: false})
}

export async function listUnactiveNotes() {
  return noteRepository.findMany({archived: true})
}

export async function archiveNote(id: string) {
  return noteRepository.update(id, {archived: true})
}
