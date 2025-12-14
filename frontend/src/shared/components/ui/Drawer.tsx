import React, { useEffect, useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from "../../../store/noteApi";
import type { NoteStatus, NoteUpsertDTO } from "../../../types";

type DrawerProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  notesStatus: NoteStatus;
  editingNote?: {
    id: string;
    title: string;
    content: string;
  } | null;
};

export function Drawer({
  open,
  title = "Write your note!",
  onClose,
  notesStatus,
  editingNote = null,
}: DrawerProps) {
  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const [
    createNote,
    { isLoading: isCreating, isError: createIsError, error: createError },
  ] = useCreateNoteMutation();

  const [
    updateNote,
    { isLoading: isUpdating, isError: updateIsError, error: updateError },
  ] = useUpdateNoteMutation();

  const isEditMode = !!editingNote;
  const isSaving = isCreating || isUpdating;
  const mutationError = isEditMode ? updateError : createError;
  const mutationIsError = isEditMode ? updateIsError : createIsError;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // ✅ para precargar cuando cambia editingNote, remount con key
  const formKey = editingNote?.id ?? "create";

  const errorMessage = useMemo(() => {
    if (!mutationIsError) return null;

    const error = mutationError;

    if (error && typeof error === "object" && error !== null) {
      if ("status" in error) {
        const data = (error as { data?: unknown }).data;

        if (typeof data === "string") return data;

        if (typeof data === "object" && data !== null && "message" in data) {
          const msg = (data as { message?: unknown }).message;
          return typeof msg === "string" ? msg : "Request failed.";
        }
        return "Request failed.";
      }

      if ("message" in error) {
        const msg = (error as { message?: unknown }).message;
        return typeof msg === "string" ? msg : "Unexpected error.";
      }
    }

    return isEditMode
      ? "Could not update the note. Please try again."
      : "Could not create the note. Please try again.";
  }, [mutationIsError, mutationError, isEditMode]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <Overlay onClick={handleClose} />
      <Panel
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={handleClose} aria-label="Close drawer">
            ✕
          </CloseButton>
        </Header>

        <Content>
          <DrawerForm
            key={formKey}
            isSaving={isSaving}
            errorMessage={errorMessage}
            onCancel={handleClose}
            onSubmit={async (values) => {
              if (isSaving) return;

              if (isEditMode && editingNote) {
                await updateNote({
                  id: editingNote.id,
                  title: values.title,
                  content: values.content,
                  status: notesStatus,
                }).unwrap();

                onClose();
                return;
              }

              const payload: NoteUpsertDTO = {
                title: values.title,
                content: values.content,
              } as NoteUpsertDTO;

              await createNote(payload).unwrap();
              onClose();
            }}
            initialValues={{
              title: editingNote?.title ?? "",
              content: editingNote?.content ?? "",
            }}
          />
        </Content>
      </Panel>
    </>,
    document.body
  );
}

// --------------------
// Form interno
// --------------------
function DrawerForm({
  isSaving,
  errorMessage,
  onCancel,
  onSubmit,
  initialValues,
}: {
  isSaving: boolean;
  errorMessage: string | null;
  onCancel: () => void;
  onSubmit: (values: { title: string; content: string }) => Promise<void>;
  initialValues: { title: string; content: string };
}) {
  const [noteTitle, setNoteTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  const canSubmit = useMemo(() => noteTitle.trim().length > 0, [noteTitle]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || isSaving) return;

    await onSubmit({
      title: noteTitle.trim(),
      content: content.trim() || "",
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Paper>
        <Label>
          Title *
          <Input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="E.g. Buy milk"
            autoFocus
            disabled={isSaving}
          />
        </Label>

        <Label>
          Content
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something…"
            rows={10}
            disabled={isSaving}
          />
        </Label>

        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      </Paper>

      <Footer>
        <GhostButton type="button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </GhostButton>

        <PrimaryButton type="submit" disabled={!canSubmit || isSaving}>
          {isSaving ? "Saving…" : "Save note"}
        </PrimaryButton>
      </Footer>
    </Form>
  );
}

/* --- styles (sin cambios) --- */

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

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Paper = styled.div`
  background: #fbf7e9;
  border: 1px solid rgba(84, 74, 57, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 16px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #544a39;
  margin-bottom: 12px;
`;

const Input = styled.input`
  border-radius: 12px;
  border: 1px solid rgba(84, 74, 57, 0.18);
  background: rgba(255, 255, 255, 0.75);
  padding: 10px 12px;
  font-size: 14px;
  color: #2f2a22;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 4px rgba(84, 74, 57, 0.12);
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const Textarea = styled.textarea`
  border-radius: 12px;
  border: 1px solid rgba(84, 74, 57, 0.18);
  background: rgba(255, 255, 255, 0.75);
  padding: 10px 12px;
  font-size: 14px;
  color: #2f2a22;
  resize: vertical;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 4px rgba(84, 74, 57, 0.12);
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const ErrorBox = styled.div`
  margin-top: 6px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(220, 38, 38, 0.25);
  background: rgba(220, 38, 38, 0.08);
  color: rgb(153, 27, 27);
  font-size: 13px;
  font-weight: 600;
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const GhostButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #ffffff;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #8b6a3d;
  color: #fff;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
