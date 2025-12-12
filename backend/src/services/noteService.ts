import { NoteUpsertDTO } from '../repositories/noteRepository';
import * as noteRepository from '../repositories/noteRepository';
import { NoteStatus } from '@prisma/client';

export async function createNote({ title, content, categoryId }: NoteUpsertDTO) {
  if (!title || title.trim() === '') {
    throw new Error('Title is required.');
  }

  return await noteRepository.create({
    title,
    content: content ?? null,
    categoryId: categoryId ?? null,
  });
}

export async function deleteNote(id: string) {
  return await noteRepository.deleteNote(id);
}

export async function listNotes(status: NoteStatus) {
  return await noteRepository.findMany({ status });
}

export async function updateNote(id: string, note: NoteUpsertDTO) {
  return await noteRepository.update(id, note);
}
