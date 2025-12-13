import React from "react";
import styled from "styled-components";

type DrawerProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Drawer({
  open,
  title = "Menu",
  onClose,
  children,
}: DrawerProps) {
  return (
    <>
      {/* Overlay: click afuera cierra */}
      <Overlay $open={open} onClick={onClose} />

      {/* Panel: stopPropagation para que click adentro NO cierre */}
      <Panel
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose} aria-label="Close drawer">
            ✕
          </CloseButton>
        </Header>

        <Content>{children}</Content>
      </Panel>
    </>
  );
}

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;

  /* oscurece + BLUR del contenido detrás */
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 160ms ease;

  z-index: 90;
`;

const Panel = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(500px, 92vw);

  background: #ffffff;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.15);

  transform: translateX(${({ $open }) => ($open ? "0%" : "100%")});
  transition: transform 200ms ease;

  z-index: 100;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const CloseButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: transparent;
  border-radius: 9999px;
  width: 34px;
  height: 34px;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Content = styled.div`
  padding: 16px;
  overflow: auto;
  flex: 1;
`;
