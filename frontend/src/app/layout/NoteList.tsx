import styled from "styled-components";
import { Note } from "../../shared/components/ui/Note";
import { useGetNotesQuery } from "../../store/noteApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export function NoteList() {
  const notesStatus = useSelector((state: RootState) => state.ui.notesStatus);

  const {
    data: notes,
    isLoading,
    isFetching,
    isError,
  } = useGetNotesQuery(notesStatus);

  if (isLoading) return <div>Cargando notas…</div>;
  if (isError) return <div>Error cargando notas</div>;

  if (!notes?.length) return <div>No hay notas</div>;

  return (
    <NoteContainer aria-busy={isFetching}>
      {notes.map((note) => (
        <Note
          id={note.id}
          key={note.id}
          title={note.title}
          content={note.content ?? ""}
          status={notesStatus}
          category={note.category ?? undefined}
        />
      ))}
    </NoteContainer>
  );
}

const NoteContainer = styled.div`
  padding-top: 30px;
  padding-left: 30px;
  display: flex;
  gap: 50px;
`;
