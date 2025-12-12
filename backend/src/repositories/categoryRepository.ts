import { Prisma } from '@prisma/client';
import { db } from '../lib/db';

export type CategoryUpsertDTO = Prisma.CategoryUncheckedCreateInput;

export async function findMany() {
  return await db.category.findMany();
}

export async function findById(id: string) {
  return await db.category.findUnique({
    where: {
      id,
    },
  });
}

export async function create(category: CategoryUpsertDTO) {
  return await db.category.create({
    data: category,
  });
}

export async function deleteNote(id: string) {
  return await db.category.delete({
    where: { id },
  });
}

export async function update(id: string, category: CategoryUpsertDTO) {
  return db.category.update({
    where: { id },
    data: category,
  });
}
