import styled from "styled-components";
import { NoteIcon } from "../../shared/icons/noteIcon";
import { Button } from "../../shared/components/ui/Button";
import { Drawer } from "../../shared/components/ui/drawer";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <Navbar>
      <Inner>
        <NoteIcon />
        <Title>Nōta</Title>
        <Button onClick={() => setOpen(true)}>+ New Note</Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          hola
        </Drawer>
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
