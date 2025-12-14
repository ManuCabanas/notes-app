import type { Category, NoteStatus } from "../../../types";
import { Note } from "./Note";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "../../../store/noteApi";
import { useGetCategoriesQuery } from "../../../store/categoryApi";

type CategoryWithId = Category & { id: string };

type NotesQueryItem = {
  id: string;
  title: string;
  content?: string | null;
  category?: CategoryWithId | null;
};

type Props = {
  note: NotesQueryItem;
  notesStatus: NoteStatus; // viene de Redux
  onEdit?: (id: string) => void;
};

export function NoteContainer({ note, notesStatus, onEdit }: Props) {
  const [updateNote, { isLoading: updating }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: deleting }] = useDeleteNoteMutation();

  const { data } = useGetCategoriesQuery();
  const categories: CategoryWithId[] = (data ?? []) as CategoryWithId[];

  const isBusy = updating || deleting;

  const categoryId = note.category?.id ?? null;

  const resolvedCategory: Category | null = categoryId
    ? categories.find((c) => c.id === categoryId) ?? note.category ?? null
    : null;

  const nextStatus: NoteStatus = notesStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  const buildUpdateBody = (status: NoteStatus) => ({
    id: note.id,
    title: note.title,
    content: note.content ?? "",
    status,
    categoryId,
  });

  const handleToggleArchive = async () => {
    if (isBusy) return;
    await updateNote(buildUpdateBody(nextStatus)).unwrap();
  };

  return (
    <Note
      id={note.id}
      title={note.title}
      content={note.content ?? ""}
      status={notesStatus}
      category={resolvedCategory}
      onEdit={onEdit}
      onArchive={handleToggleArchive}
      onUnarchive={handleToggleArchive}
      onDelete={async (id) => {
        if (isBusy) return;
        await deleteNote(id).unwrap();
      }}
    />
  );
}
