import { CategoryUpsertDTO } from '../repositories/categoryRepository';
import * as categoryRepository from '../repositories/categoryRepository';

export async function createCategory({ name, color }: CategoryUpsertDTO) {
  if (!name || name.trim() === '' || !color || color.trim() === '') {
    throw new Error('Name and Color are required.');
  }

  return await categoryRepository.create({
    name,
    color
  });
}

export async function deleteCategory(id: string) {
  return await categoryRepository.deleteNote(id);
}

export async function listCategories() {
  return await categoryRepository.findMany();
}

export async function updateCategory(id: string, category: CategoryUpsertDTO) {
  return await categoryRepository.update(id, category);
}
