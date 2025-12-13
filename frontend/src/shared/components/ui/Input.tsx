import styled from "styled-components";
import { CategoryLabel } from "./CategoryLabel";
import type { Category } from "../../../types";

type NoteStatus = "ACTIVE" | "INACTIVE";

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
          <Left>
            <Title>{title}</Title>

            {/* Category solo si ACTIVE y existe */}
            {isActive && category && (
              <CategoryLabel id={id} name={category.name} color={category.color} />
            )}
          </Left>

          <Actions>
            {isActive ? (
              <>
                <IconButton
                  type="button"
                  title="Editar"
                  aria-label="Editar"
                  onClick={() => onEdit?.(id)}
                >
                  ✏️
                </IconButton>

                <IconButton
                  type="button"
                  title="Eliminar"
                  aria-label="Eliminar"
                  onClick={() => onDelete?.(id)}
                >
                  🗑️
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  type="button"
                  title="Desarchivar"
                  aria-label="Desarchivar"
                  onClick={() => onUnarchive?.(id)}
                >
                  🗄️⬆️
                </IconButton>

                <IconButton
                  type="button"
                  title="Eliminar"
                  aria-label="Eliminar"
                  onClick={() => onDelete?.(id)}
                >
                  🗑️
                </IconButton>
              </>
            )}
          </Actions>
        </NoteHeader>

        <NoteContent>{content}</NoteContent>
      </Inner>
    </NoteDiv>
  );
}

const NoteDiv = styled.div`
  width: 320px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
`;

const Inner = styled.div`
  padding: 16px;
`;

const NoteHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #2b241b;
  line-height: 1.2;
  word-break: break-word;
`;

const Actions = styled.div`
  display: inline-flex;
  gap: 8px;
  flex-shrink: 0;
`;

const IconButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 999px;

  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(248, 245, 237, 0.7);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: transform 120ms ease, background 150ms ease, box-shadow 150ms ease;

  &:hover {
    background: rgba(248, 245, 237, 1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
  }
`;

const NoteContent = styled.p`
  margin: 12px 0 0 0;
  color: #5b4f3d;
  font-size: 14px;
  line-height: 1.35;
  white-space: pre-wrap;
`;
