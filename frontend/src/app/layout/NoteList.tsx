import styled from "styled-components";
import { useMemo, useState } from "react";
import { useGetNotesByStatusQuery } from "../../store/noteApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { NoteContainer } from "../../shared/components/ui/NoteContainer";
import { Drawer } from "../../shared/components/ui/Drawer";

const NotesWrapper = styled.div`
  padding-top: 30px;
  padding-left: 30px;
  display: flex;
  gap: 50px;
`;

export function NoteList() {
  const notesStatus = useSelector((state: RootState) => state.ui.notesStatus);

  const { data: notes, isLoading, isFetching, isError } =
    useGetNotesByStatusQuery(notesStatus);

  // ✅ Drawer state
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ Nota seleccionada para editar (precarga)
  const editingNote = useMemo(() => {
    if (!editingId) return null;

    const n = notes?.find((x) => x.id === editingId);
    if (!n) return null;

    return {
      id: n.id,
      title: n.title ?? "",
      content: n.content ?? "",
      categoryId: n.category?.id ?? "",
    };
  }, [notes, editingId]);

  // ✅ abre drawer con esa nota
  const handleEdit = (id: string) => {
    setEditingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
  };

  if (isLoading)
    return (
      <CenteredState>
        <StateCard>
          <StateTitle>Loading notes…</StateTitle>
          <StateText>
            Please wait a moment while we get everything ready 🗂️
          </StateText>
        </StateCard>
      </CenteredState>
    );

  if (isError)
    return (
      <CenteredState>
        <StateCard>
          <StateTitle>Something went wrong 😕</StateTitle>
          <StateText>
            We couldn’t load your notes. Please try again in a moment.
          </StateText>
        </StateCard>
      </CenteredState>
    );

  if (!notes?.length)
    return (
      <CenteredState>
        <StateCard>
          <StateTitle>No notes yet</StateTitle>
          <StateText>
            You haven’t created any notes yet. Start by adding a new one ✍️
          </StateText>
        </StateCard>
      </CenteredState>
    );

  return (
    <>
      <NotesWrapper aria-busy={isFetching}>
        {notes.map((note) => (
          <NoteContainer
            key={note.id}
            note={note}
            notesStatus={notesStatus}
            onEdit={handleEdit} // ✅ esto habilita el lápiz
          />
        ))}
      </NotesWrapper>

      {/* ✅ Drawer (create/edit) */}
      <Drawer
        open={open}
        onClose={handleClose}
        title={editingNote ? "Edit your note" : "Write your note!"}
        notesStatus={notesStatus}
        editingNote={editingNote}
      />
    </>
  );
}

const CenteredState = styled.div`
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StateCard = styled.div`
  background: #f9f5ed;
  border: 1px solid #e6dfaf;
  border-radius: 14px;
  padding: 32px 40px;

  text-align: center;
  max-width: 420px;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
`;

const StateTitle = styled.h3`
  font-family: "Patrick Hand", cursive;
  font-size: 28px;
  color: #46443f;
  margin: 0 0 8px;
`;

const StateText = styled.p`
  font-family: "Source Sans 3", sans-serif;
  font-size: 15px;
  color: #5f5645;
  margin: 0;
  opacity: 0.85;
`;
