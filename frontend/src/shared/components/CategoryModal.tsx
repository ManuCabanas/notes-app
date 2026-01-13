import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../store/categoryApi";

type CategoryModalProps = {
  open: boolean;
  onClose: () => void;
};

const PRESET_COLORS = [
  "#E57373", // red
  "#F06292", // pink
  "#BA68C8", // purple
  "#9575CD", // deep purple
  "#7986CB", // indigo
  "#64B5F6", // blue
  "#4FC3F7", // light blue
  "#4DD0E1", // cyan
  "#4DB6AC", // teal
  "#81C784", // green
  "#AED581", // light green
  "#DCE775", // lime
  "#FFF176", // yellow
  "#FFD54F", // amber
  "#FFB74D", // orange
  "#A1887F", // brown
];

export function CategoryModal({ open, onClose }: CategoryModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  const { data: categories = [] } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const isBusy = isCreating || isDeleting;

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setName("");
      setColor(PRESET_COLORS[0]);
    }
  }, [open]);

  const canSubmit = useMemo(() => name.trim().length > 0, [name]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || isBusy) return;

    await createCategory({ name: name.trim(), color }).unwrap();
    setName("");
    setColor(PRESET_COLORS[0]);
  }

  async function handleDelete(id: string) {
    if (isBusy) return;
    await deleteCategory(id).unwrap();
  }

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <Overlay onClick={onClose} />
      <ModalContainer role="dialog" aria-modal="true">
        <Header>
          <Title>Manage Categories</Title>
          <CloseButton onClick={onClose} aria-label="Close modal">
            ✕
          </CloseButton>
        </Header>

        <Content>
          {/* Create new category form */}
          <Section>
            <SectionTitle>Create new category</SectionTitle>
            <Form onSubmit={handleSubmit}>
              <InputRow>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Category name..."
                  disabled={isBusy}
                />
                <CreateButton type="submit" disabled={!canSubmit || isBusy}>
                  {isCreating ? "Adding..." : "Add"}
                </CreateButton>
              </InputRow>

              <ColorPicker>
                <ColorLabel>Pick a color:</ColorLabel>
                <ColorGrid>
                  {PRESET_COLORS.map((c) => (
                    <ColorSwatch
                      key={c}
                      type="button"
                      $color={c}
                      $selected={color === c}
                      onClick={() => setColor(c)}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </ColorGrid>
              </ColorPicker>

              <Preview>
                <PreviewLabel>Preview:</PreviewLabel>
                <CategoryTag $color={color}>
                  {name.trim() || "Category name"}
                </CategoryTag>
              </Preview>
            </Form>
          </Section>

          {/* Existing categories */}
          <Section>
            <SectionTitle>Your categories</SectionTitle>
            {categories.length === 0 ? (
              <EmptyState>No categories yet. Create one above!</EmptyState>
            ) : (
              <CategoryList>
                {categories.map((cat) => (
                  <CategoryItem key={cat.id}>
                    <CategoryTag $color={cat.color}>{cat.name}</CategoryTag>
                    <DeleteButton
                      type="button"
                      onClick={() => handleDelete(cat.id)}
                      disabled={isBusy}
                      aria-label={`Delete ${cat.name}`}
                    >
                      <TrashIcon />
                    </DeleteButton>
                  </CategoryItem>
                ))}
              </CategoryList>
            )}
          </Section>
        </Content>
      </ModalContainer>
    </>,
    document.body
  );
}

/* --- Styled Components --- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  z-index: 999;
  animation: fadeIn 200ms ease forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(500px, 92vw);
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  background: #fffcf7;
  border: 1px solid rgba(84, 74, 57, 0.15);
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);

  z-index: 1000;
  animation: slideUp 280ms cubic-bezier(0.22, 1, 0.36, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, -45%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(84, 74, 57, 0.1);
  background: rgba(249, 245, 237, 0.5);
`;

const Title = styled.h2`
  margin: 0;
  font-family: "Patrick Hand", cursive;
  font-size: 24px;
  font-weight: 400;
  color: #3a3632;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6b5f50;
  transition: background 150ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

const Section = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px dashed rgba(84, 74, 57, 0.15);
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 14px;
  font-family: "Caveat", cursive;
  font-size: 20px;
  font-weight: 600;
  color: #5a5045;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(84, 74, 57, 0.2);
  background: rgba(255, 255, 255, 0.8);
  font-family: "Caveat", cursive;
  font-size: 18px;
  font-weight: 500;
  color: #3a3632;
  outline: none;
  transition: box-shadow 150ms ease, border-color 150ms ease;

  &:focus {
    border-color: rgba(84, 74, 57, 0.4);
    box-shadow: 0 0 0 4px rgba(84, 74, 57, 0.08);
  }

  &::placeholder {
    color: #a09585;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const CreateButton = styled.button`
  padding: 0 20px;
  border-radius: 12px;
  border: none;
  background: #8b6a3d;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: filter 150ms ease, transform 100ms ease;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ColorPicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColorLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6b5f50;
`;

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ColorSwatch = styled.button<{ $color: string; $selected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid ${({ $selected }) => ($selected ? "#3a3632" : "transparent")};
  background: ${({ $color }) => $color};
  cursor: pointer;
  transition: transform 150ms ease, border-color 150ms ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.15);
  }
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PreviewLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6b5f50;
`;

const CategoryTag = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  background: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}44;
  color: ${({ $color }) => $color};
  font-family: "Caveat", cursive;
  font-size: 16px;
  font-weight: 600;
  filter: brightness(0.85);
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(84, 74, 57, 0.1);
  transition: background 150ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const DeleteButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9a8a7a;
  transition: color 150ms ease, background 150ms ease;

  &:hover:not(:disabled) {
    color: #c0392b;
    background: rgba(192, 57, 43, 0.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.p`
  margin: 0;
  padding: 20px;
  text-align: center;
  font-family: "Caveat", cursive;
  font-size: 18px;
  color: #9a8a7a;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  border: 1px dashed rgba(84, 74, 57, 0.15);
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
