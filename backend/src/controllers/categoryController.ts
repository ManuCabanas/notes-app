import { Request, Response } from 'express';
import { NoteStatus } from '@prisma/client';
import * as categoryService from '../services/categoryService';
import { handleRequest } from '../utils/requestHandler'; // ruta donde pongas el helper

export const listCategories = handleRequest(async (req: Request, res: Response) => {
  const categories = await categoryService.listCategories();
  res.json(categories);
}, 'Error listing categories');

export const createCategory = handleRequest(async (req: Request, res: Response) => {
  const { name, color } = req.body;
  const category = await categoryService.createCategory({ name, color });
  res.json(category);
}, 'Error creating category');

export const updateCategory = handleRequest(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing category id' });
  }

  const { name, color } = req.body;
  const category = await categoryService.updateCategory(id, { name, color });
  res.json(category);
}, 'Error updating category');

export const deleteCategory = handleRequest(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing category id' });
  }

  const result = await categoryService.deleteCategory(id);
  res.json(result);
}, 'Error deleting category');
