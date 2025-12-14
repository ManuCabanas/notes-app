import styled from "styled-components";
import { NoteIcon } from "../../shared/icons/NoteIcon";
import { Button } from "../../shared/components/ui/Button";
import { Drawer } from "../../shared/components/ui/Drawer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotesStatus } from "../../store/uiSlice";
import type { RootState } from "../../store/store";
import { ArchiveIcon } from "../../shared/components/ui/ArchiveIcon";

export function Header() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const notesStatus = useSelector((state: RootState) => state.ui.notesStatus);

  const isActive = notesStatus === "ACTIVE";

  return (
    <Navbar>
      <Inner>
        <NoteIcon />
        <Title>Nōta</Title>

        <Actions>
          <ArchiveButton
            type="button"
            onClick={() => dispatch(toggleNotesStatus())}
            title={isActive ? "Ver archivadas" : "Ver activas"}
          >
            <ArchiveIcon />
            <ArchiveText>{isActive ? "Archived" : "Actives"}</ArchiveText>
          </ArchiveButton>

          <Button onClick={() => setOpen(true)}>+ New Note</Button>
        </Actions>

        <Drawer
          open={open}
          notesStatus={notesStatus}
          onClose={() => setOpen(false)}
        />
      </Inner>
    </Navbar>
  );
}

const Navbar = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;

  background: #fcf8f8;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  min-height: 64px;
  max-height: 82px;
`;

const Inner = styled.div`
  width: 100%;
  padding: 16px 24px;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 900;
  color: #544a39ff;
  padding-left: 10px;
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ArchiveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  height: 36px;
  padding: 0 12px;

  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(248, 245, 237, 0.9);

  font-size: 14px;
  font-weight: 500;
  color: #4a3f35;

  cursor: pointer;

  transition: background 150ms ease, box-shadow 150ms ease, transform 100ms ease;

  &:hover {
    background: rgba(248, 245, 237, 1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ArchiveText = styled.span`
  font-size: 13px;
`;
