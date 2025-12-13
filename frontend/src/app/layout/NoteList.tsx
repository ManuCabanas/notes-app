import styled from "styled-components";
import { Note } from "../../shared/components/ui/Note";

const notes = [
  {
    title: "Note1",
    content: "content1",
    category: {
      name: "Work",
      color: "#f65a5aff",
    },
  },
  {
    title: "Note2",
    content: "content2",
    category: {
      name: "Exercise",
      color: "#9fde96ff",
    },
  },
];

export function NoteList() {
  return (
    <NoteContainer>
      {notes.map((note) => (
        <Note
          title={note.title}
          content={note.content}
          category={note.category}
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
