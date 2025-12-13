import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, ...props }: ButtonProps) {
  return <ButtonDiv {...props}>{children}</ButtonDiv>;
}
const ButtonDiv = styled.button`
  width: 140px;
  height: 40px;

  margin-left: auto;
  margin-right: 20px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: none;
  border-radius: 10px;

  background-color: #a67c3c; /* similar a hsl(25 60% 45%) */
  color: #faf7f2;

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;

  cursor: pointer;
  white-space: nowrap;

  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 100ms ease, box-shadow 150ms ease;

  &:hover {
    background-color: #b56f24; /* un poco más oscuro */
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
