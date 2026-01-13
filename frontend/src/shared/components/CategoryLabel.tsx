import styled from "styled-components";

type CategoryLabelProps = {
  name: string;
  color: string;
  size?: "sm" | "md";
};

export function CategoryLabel({ name, color, size = "sm" }: CategoryLabelProps) {
  return (
    <Label $color={color} $size={size}>
      <Dot $color={color} $size={size} />
      <Text $size={size}>{name}</Text>
    </Label>
  );
}

const Label = styled.span<{ $color: string; $size: "sm" | "md" }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $size }) => ($size === "sm" ? "5px" : "6px")};

  padding: ${({ $size }) => ($size === "sm" ? "3px 10px" : "5px 12px")};

  background: ${({ $color }) => `${$color}15`};
  border: 1px solid ${({ $color }) => `${$color}30`};
  border-radius: var(--radius-full);
  
  transition: all var(--transition-fast);
  
  &:hover {
    background: ${({ $color }) => `${$color}25`};
    border-color: ${({ $color }) => `${$color}50`};
  }
`;

const Dot = styled.span<{ $color: string; $size: "sm" | "md" }>`
  width: ${({ $size }) => ($size === "sm" ? "6px" : "8px")};
  height: ${({ $size }) => ($size === "sm" ? "6px" : "8px")};
  
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 0 2px ${({ $color }) => `${$color}30`};
  
  flex-shrink: 0;
`;

const Text = styled.span<{ $size: "sm" | "md" }>`
  font-family: var(--font-body);
  font-size: ${({ $size }) => ($size === "sm" ? "11px" : "13px")};
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
  letter-spacing: 0.2px;
`;
