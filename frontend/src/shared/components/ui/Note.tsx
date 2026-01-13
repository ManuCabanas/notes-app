import styled from "styled-components";
import type { Category, NoteStatus } from "../../../types";
import { CategoryLabel } from "./CategoryLabel";
import { ArchiveIcon } from "./ArchiveIcon";

export type NoteProps = {
  id: string;
  title: string;
  content?: string | null;
  category?: Category | null;
  status: NoteStatus;

  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onArchive?: (id: string) => void;
};

export function Note({
  id,
  title,
  content,
  category,
  status,
  onDelete,
  onEdit,
  onUnarchive,
  onArchive,
}: NoteProps) {
  const isActive = status === "ACTIVE";

  const handleArchiveClick = () => {
    onArchive?.(id);
  };

  const handleUnarchiveClick = () => {
    onUnarchive?.(id);
  };

  const handleDeleteClick = () => {
    onDelete?.(id);
  };

  const handleEditClick = () => {
    onEdit?.(id);
  };

  return (
    <NoteDiv>
      <Inner>
        <NoteHeader>
          <Title>{title}</Title>

          {isActive && category && (
            <CategoryWrap>
              <CategoryLabel
                id={id}
                name={category.name}
                color={category.color}
              />
            </CategoryWrap>
          )}
        </NoteHeader>

        <NoteContent>{content ?? ""}</NoteContent>

        <Footer>
          <Actions>
            {isActive ? (
              <>
                <IconButton
                  type="button"
                  title="Edit"
                  onClick={handleEditClick}
                >
                  <IconWrap>
                    <PencilIcon />
                  </IconWrap>
                </IconButton>
                <IconButton
                  type="button"
                  title="Archivar"
                  onClick={handleArchiveClick}
                >
                  <IconWrap>
                    <ArchiveIcon />
                  </IconWrap>
                </IconButton>

                <IconButton
                  type="button"
                  title="Eliminar"
                  onClick={handleDeleteClick}
                >
                  <IconWrap>
                    <TrashIcon />
                  </IconWrap>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  type="button"
                  title="Desarchivar"
                  onClick={handleUnarchiveClick}
                >
                  <IconWrap>
                    <ArchiveIcon />
                  </IconWrap>
                </IconButton>

                <IconButton
                  type="button"
                  title="Eliminar"
                  onClick={handleDeleteClick}
                >
                  <IconWrap>
                    <TrashIcon />
                  </IconWrap>
                </IconButton>
              </>
            )}
          </Actions>
        </Footer>
      </Inner>
    </NoteDiv>
  );
}

const NoteDiv = styled.div`
  width: 350px;
  height: 350px;
  overflow: auto;

  background-color: #f9f5ed;
  border: 1px solid #e6dfaf;
  border-radius: 10px;

  transition: background-color 150ms ease;

  &:hover {
    background-color: #f2ebdc;
  }
`;

const Inner = styled.div`
  height: 100%;
  padding: 10px;

  display: flex;
  flex-direction: column;
`;

const NoteHeader = styled.div`
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  min-height: 50px;
  padding-bottom: 10px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const CategoryWrap = styled.div`
  align-self: flex-start;
  margin-top: 2px;
`;

const Title = styled.div`
  font-family: "Patrick Hand", cursive;
  font-size: 26px;
  font-weight: 400;
  color: #3a3632;
  letter-spacing: 0.5px;

  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NoteContent = styled.div`
  font-family: "Caveat", cursive;
  font-size: 20px;
  font-weight: 500;
  color: #4a4540;
  line-height: 1.4;
  letter-spacing: 0.3px;

  padding-top: 10px;

  flex: 1;
  overflow: auto;
  white-space: pre-wrap;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 10px;

  display: flex;
  justify-content: flex-end;
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

  display: inline-flex;
  align-items: center;
  justify-content: center;

  opacity: 0.7;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

// ✅ Clave: esto evita que el SVG “se coma” el click
const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  & svg {
    pointer-events: none;
    display: block;
  }
`;

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>
);

const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-pencil"
    viewBox="0 0 16 16"
  >
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
  </svg>
);
