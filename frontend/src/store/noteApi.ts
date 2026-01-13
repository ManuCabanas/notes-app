import type { Category, NoteUpsertDTO } from "../types";
import { baseApi } from "./baseApi";

type Note = {
  id: string;
  title: string;
  content?: string;
  category?: Category | null;
};

type NoteStatus = "ACTIVE" | "INACTIVE";

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], string>({
      query: () => "/notes",
      providesTags: (result) =>
        result
          ? [
              { type: "Notes" as const, id: "LIST" },
              ...result.map((n) => ({ type: "Notes" as const, id: n.id })),
            ]
          : [{ type: "Notes" as const, id: "LIST" }],
    }),
    getNotesByStatus: builder.query<Note[], NoteStatus>({
      query: (status) => ({
        url: `/notes`,
        params: { status },
      }),
      providesTags: (result, _error, status) =>
        result
          ? [
              { type: "Notes" as const, id: `LIST-${status}` },
              ...result.map((n) => ({ type: "Notes" as const, id: n.id })),
            ]
          : [{ type: "Notes" as const, id: `LIST-${status}` }],
    }),
    getNoteById: builder.query<Note, string>({
      query: (noteId) => `/notes/${noteId}`,
      providesTags: (_result, _error, noteId) => [{ type: "Notes", id: noteId }],
    }),
    createNote: builder.mutation<Note, NoteUpsertDTO>({
      query: (note) => ({
        url: `/notes`,
        method: "POST",
        body: note,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Notes"]),
    }),
    deleteNote: builder.mutation<void, string>({
      query: (noteId) => ({
        url: `notes/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Notes"]),
    }),
    updateNote: builder.mutation<Note, NoteUpsertDTO & { id: string }>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "PUT",
        body: note,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Notes"]),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotesQuery,
  useGetNotesByStatusQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = noteApi;
