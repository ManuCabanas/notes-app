import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type DrawerProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Drawer({
  open,
  title = "Write your note!",
  onClose,
  children,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <Overlay onClick={onClose} />
      <Panel
        role="dialog"
        aria-modal="true"
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
    </>,
    document.body
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);

  z-index: 999;

  opacity: 0;
  animation: fadeIn 200ms ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;

const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(650px, 92vw);

  background: #ffffff;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.15);

  z-index: 1000;

  display: flex;
  flex-direction: column;

  transform: translateX(0);
  animation: slideIn 320ms cubic-bezier(0.22, 1, 0.36, 1);

  will-change: transform;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Respeta accesibilidad */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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
