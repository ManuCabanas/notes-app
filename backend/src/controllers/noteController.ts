import { Request, Response } from 'express';
import { NoteStatus } from '@prisma/client';
import * as noteService from '../services/noteService';
import { handleRequest } from '../utils/requestHandler'; // ruta donde pongas el helper

export const listNotes = handleRequest(async (req: Request, res: Response) => {
  const archivedParam = req.query.status;
  const archived = archivedParam === 'ACTIVE' ? NoteStatus.ACTIVE : NoteStatus.INACTIVE;

  const notes = await noteService.listNotes(archived);
  res.json(notes);
}, 'Error listing notes');

export const createNote = handleRequest(async (req: Request, res: Response) => {
  const { title, content, categoryId } = req.body;
  const note = await noteService.createNote({ title, content, categoryId });
  res.json(note);
}, 'Error creating note');

export const updateNote = handleRequest(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing note id' });
  }

  const { title, content, categoryId } = req.body;
  const note = await noteService.updateNote(id, { title, content, categoryId });
  res.json(note);
}, 'Error updating note');

export const deleteNote = handleRequest(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing note id' });
  }

  const result = await noteService.deleteNote(id);
  res.json(result);
}, 'Error deleting note');
