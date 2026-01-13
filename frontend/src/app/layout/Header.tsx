import styled from "styled-components";
import { NoteIcon } from "../../shared/icons/NoteIcon";
import { Drawer } from "../../shared/components/Drawer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotesStatus } from "../../store/uiSlice";
import type { RootState } from "../../store/store";
import { CategoryModal } from "../../shared/components/CategoryModal";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const dispatch = useDispatch();
  const notesStatus = useSelector((state: RootState) => state.ui.notesStatus);

  const isActive = notesStatus === "ACTIVE";

  return (
    <Navbar>
      <Inner>
        <Brand>
          <LogoWrap>
            <NoteIcon />
          </LogoWrap>
          <Title>Nōta</Title>
        </Brand>

        <Actions>
          <ToggleButton
            type="button"
            onClick={() => dispatch(toggleNotesStatus())}
            $isActive={isActive}
          >
            <ToggleIcon $isActive={isActive}>
              {isActive ? <ArchiveSvg /> : <NoteSvg />}
            </ToggleIcon>
            <span>{isActive ? "View Archived" : "View Active"}</span>
          </ToggleButton>

          <PrimaryButton onClick={() => setDrawerOpen(true)}>
            <PlusIcon />
            New Note
          </PrimaryButton>
          
          <SecondaryButton onClick={() => setCategoryModalOpen(true)}>
            <TagIcon />
            Categories
          </SecondaryButton>
        </Actions>

        <Drawer
          open={drawerOpen}
          notesStatus={notesStatus}
          onClose={() => setDrawerOpen(false)}
        />
        <CategoryModal
          open={categoryModalOpen}
          onClose={() => setCategoryModalOpen(false)}
        />
      </Inner>
    </Navbar>
  );
}

/* ===== Styled Components ===== */

const Navbar = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;

  background: rgba(251, 248, 244, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--color-border);
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
  
  display: flex;
  align-items: center;
  gap: var(--space-lg);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 400;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
  margin: 0;
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);

  height: 40px;
  padding: 0 var(--space-md);

  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: ${({ $isActive }) => 
    $isActive ? 'var(--color-bg-elevated)' : 'var(--color-primary-glow)'};

  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);

  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-bg-hover);
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-sm);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ToggleIcon = styled.span<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 20px;
  height: 20px;
  color: ${({ $isActive }) => 
    $isActive ? 'var(--color-text-muted)' : 'var(--color-primary)'};
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);

  height: 40px;
  padding: 0 var(--space-lg);

  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.15);

  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: white;

  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);

  height: 40px;
  padding: 0 var(--space-md);

  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-bg-elevated);

  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);

  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-bg-hover);
    border-color: var(--color-primary-light);
    color: var(--color-primary-dark);
    box-shadow: var(--shadow-sm);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

/* ===== Icons ===== */

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const ArchiveSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
    <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM7 11a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const NoteSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
  </svg>
);
