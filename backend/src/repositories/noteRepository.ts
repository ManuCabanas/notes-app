import { db } from '../lib/db';
import { NoteUpsertDTO } from '../types/note';

type NoteFindFilter = {
  archived?: Boolean;
};

export async function findMany(filter: NoteFindFilter) {
  return db.note.findMany({
    where: filter,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findById(id: string) {
  return db.note.findUnique({
    where: {
      id,
    },
  });
}

export async function create(note: NoteUpsertDTO) {
  return db.note.create({
    data: note,
  });
}

export async function update(id: string, note: NoteUpsertDTO) {
  return db.note.update({
    where: { id },
    data: note,
  });
}
