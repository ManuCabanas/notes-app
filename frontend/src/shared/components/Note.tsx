import styled from "styled-components";
import type { Category, NoteStatus } from "../../types";
import { CategoryLabel } from "./CategoryLabel";

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

  return (
    <NoteCard $isArchived={!isActive}>
      <PinDecoration />
      
      <CardContent>
        <Header>
          <Title>{title}</Title>
          {category && (
            <CategoryLabel name={category.name} color={category.color} />
          )}
        </Header>

        <Content>{content ?? ""}</Content>

        <Footer>
          <Actions>
            {isActive ? (
              <>
                <ActionButton
                  type="button"
                  title="Edit note"
                  onClick={() => onEdit?.(id)}
                  $variant="default"
                >
                  <PencilIcon />
                </ActionButton>
                <ActionButton
                  type="button"
                  title="Archive note"
                  onClick={() => onArchive?.(id)}
                  $variant="default"
                >
                  <ArchiveIcon />
                </ActionButton>
                <ActionButton
                  type="button"
                  title="Delete note"
                  onClick={() => onDelete?.(id)}
                  $variant="danger"
                >
                  <TrashIcon />
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton
                  type="button"
                  title="Restore note"
                  onClick={() => onUnarchive?.(id)}
                  $variant="default"
                >
                  <RestoreIcon />
                </ActionButton>
                <ActionButton
                  type="button"
                  title="Delete permanently"
                  onClick={() => onDelete?.(id)}
                  $variant="danger"
                >
                  <TrashIcon />
                </ActionButton>
              </>
            )}
          </Actions>
        </Footer>
      </CardContent>
      
      <CornerFold />
    </NoteCard>
  );
}

/* ===== Styled Components ===== */

const NoteCard = styled.article<{ $isArchived: boolean }>`
  position: relative;
  width: 320px;
  min-height: 280px;
  max-height: 380px;
  
  background: ${({ $isArchived }) => 
    $isArchived 
      ? 'linear-gradient(145deg, #F5F2EC 0%, #EBE7DF 100%)' 
      : 'linear-gradient(145deg, var(--color-bg-note) 0%, #FBF7F0 100%)'};
  border: 1px solid var(--color-border-note);
  border-radius: var(--radius-lg);
  
  box-shadow: var(--shadow-note);
  
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-4px) rotate(0.5deg);
    box-shadow: var(--shadow-note-hover);
  }
  
  ${({ $isArchived }) => $isArchived && `
    opacity: 0.85;
    filter: saturate(0.7);
  `}
`;

const PinDecoration = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  
  width: 24px;
  height: 24px;
  
  background: radial-gradient(circle at 30% 30%, #D4A574 0%, #8B5A2B 100%);
  border-radius: 50%;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }
`;

const CornerFold = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  
  width: 32px;
  height: 32px;
  
  background: linear-gradient(135deg, transparent 50%, var(--color-bg-hover) 50%);
  border-radius: 0 0 var(--radius-lg) 0;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.03) 50%);
  }
`;

const CardContent = styled.div`
  height: 100%;
  padding: var(--space-lg) var(--space-md) var(--space-md);
  
  display: flex;
  flex-direction: column;
  min-height: 260px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-sm);
  
  padding-bottom: var(--space-sm);
  margin-bottom: var(--space-sm);
  border-bottom: 1px dashed var(--color-border);
`;

const Title = styled.h3`
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 400;
  color: var(--color-text-primary);
  letter-spacing: 0.3px;
  line-height: 1.2;
  
  flex: 1;
  margin: 0;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Content = styled.div`
  font-family: var(--font-handwriting);
  font-size: 19px;
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.5;
  letter-spacing: 0.2px;
  
  flex: 1;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
  
  padding-right: var(--space-xs);
  margin-bottom: var(--space-sm);
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: var(--space-sm);
  border-top: 1px dashed var(--color-border);
  
  display: flex;
  justify-content: flex-end;
`;

const Actions = styled.div`
  display: flex;
  gap: var(--space-xs);
`;

const ActionButton = styled.button<{ $variant: 'default' | 'danger' }>`
  width: 32px;
  height: 32px;
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  
  color: var(--color-text-muted);
  cursor: pointer;
  
  transition: all var(--transition-fast);
  
  svg {
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
  
  &:hover {
    background: ${({ $variant }) => 
      $variant === 'danger' 
        ? 'rgba(220, 38, 38, 0.1)' 
        : 'var(--color-primary-glow)'};
    color: ${({ $variant }) => 
      $variant === 'danger' 
        ? '#DC2626' 
        : 'var(--color-primary)'};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/* ===== Icons ===== */

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

const ArchiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
    <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM7 11a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const RestoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0v2.43l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);
