import styled from "styled-components";
import type { Category, NoteStatus } from "../../../types";
import { CategoryLabel } from "./CategoryLabel";

export type NoteProps = {
  id: string;
  title: string;
  content: string;
  category?: Category | null;
  status: NoteStatus;

  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUnarchive?: (id: string) => void;
};

export function Note({
  id,
  title,
  content,
  category,
  status,
  onEdit,
  onDelete,
  onUnarchive,
}: NoteProps) {
  const isActive = status === "ACTIVE";

  return (
    <NoteDiv>
      <Inner>
        <NoteHeader>
          <Title>{title}</Title>

          <Right>
            {isActive && category && (
              <CategoryLabel
                id={id}
                name={category.name}
                color={category.color}
              />
            )}

            <Actions>
              {isActive ? (
                <>
                  <IconButton title="Editar" onClick={() => onEdit?.(id)}>
                    ✏️
                  </IconButton>
                  <IconButton title="Eliminar" onClick={() => onDelete?.(id)}>
                    🗑️
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    title="Desarchivar"
                    onClick={() => onUnarchive?.(id)}
                  >
                    🗄️⬆️
                  </IconButton>
                  <IconButton title="Eliminar" onClick={() => onDelete?.(id)}>
                    🗑️
                  </IconButton>
                </>
              )}
            </Actions>
          </Right>
        </NoteHeader>

        <NoteContent>{content}</NoteContent>
      </Inner>
    </NoteDiv>
  );
}

const NoteDiv = styled.div`
  width: 450px;
  height: 350px;

  background-color: #f9f5ed;
  border: 1px solid #e6dfaf;
  border-radius: 10px;

  &:hover {
    background-color: #f2ebdc;
  }

  transition: background-color 150ms ease;
`;

const Inner = styled.div`
  padding-left: 10px;
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  margin-top: 5px;
  padding-right: 10px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const Right = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Actions = styled.div`
  display: inline-flex;
  gap: 6px;
`;

const IconButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;

  border: none;
  background: transparent;
  cursor: pointer;

  font-size: 16px;
  line-height: 1;

  opacity: 0.7;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Title = styled.div`
  font-family: "Patrick Hand", cursive;
  font-size: 30px;
  font-weight: 900;
  color: #46443f;
`;

const NoteContent = styled.div`
  font-family: "Source Sans 3", sans-serif;
  color: #322a1f;
  opacity: 0.7;
  padding-top: 10px;
`;
