import { NoteStatus, Prisma } from '@prisma/client';
import { db } from '../lib/db';

type NoteFindFilter = {
  status: NoteStatus;
};

export type NoteUpsertDTO = Prisma.NoteUncheckedCreateInput;

export async function findMany(filter: NoteFindFilter) {
  return await db.note.findMany({
    where: filter,
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findById(id: string) {
  return await db.note.findUnique({
    where: {
      id,
    },
  });
}

export async function create(note: NoteUpsertDTO) {
  return await db.note.create({
    data: note,
  });
}

export async function deleteNote(id: string) {
    return await db.note.delete({
        where: {id}
    })
}

export async function update(id: string, note: NoteUpsertDTO) {
  return db.note.update({
    where: { id },
    data: note,
  });
}
