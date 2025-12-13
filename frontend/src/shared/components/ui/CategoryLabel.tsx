import styled from "styled-components";
import type { Category } from "../../../types";

const Label = styled.div<{ color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  margin: 5px 15px;
  padding: 4px 12px;

  background-color: #e8e1d8;
  border-radius: 15px;
  border: 1px solid ${({ color }) => color};
`;

const Dot = styled.span<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  flex-shrink: 0;
`;

const Text = styled.span<{ color: string }>`
  font-size: 12px;
  font-weight: 700; /* 👈 un poco más grueso */
  white-space: nowrap;
`;

export function CategoryLabel({ name, color }: Category) {
  return (
    <Label color={color}>
      <Dot color={color} />
      <Text color={color}>{name}</Text>
    </Label>
  );
}
