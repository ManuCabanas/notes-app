import axios from "axios";

export const api = axios.create({
  baseURL: "/",
});

export type NoteStatus = "ACTIVE" | "INACTIVE";

export interface Note {
  id: string;
  title: string;
  content: string | null;
  categoryId: string | null;
  status: NoteStatus;
}

export interface NoteUpsertDTO {
  title: string;
  content?: string | null;
  categoryId?: string | null;
}
