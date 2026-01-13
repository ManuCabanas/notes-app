import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export type SelectorOption = {
  value: string;
  label: string;
  color?: string;
};

type SelectorProps = {
  value?: string;
  onChange: (value: string) => void;
  options: SelectorOption[];
  placeholder?: string;
  disabled?: boolean;
};

export function Selector({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  function handleSelect(e: React.MouseEvent, optionValue: string) {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    onChange(optionValue);
  }

  function handleTriggerClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }

  return (
    <Container ref={containerRef}>
      <Trigger
        type="button"
        onClick={handleTriggerClick}
        $isOpen={isOpen}
        $hasValue={!!selectedOption}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <TriggerContent>
          {selectedOption?.color && <ColorDot $color={selectedOption.color} />}
          <TriggerText $isPlaceholder={!selectedOption}>
            {selectedOption?.label || placeholder}
          </TriggerText>
        </TriggerContent>
        <ChevronIcon $isOpen={isOpen} />
      </Trigger>

      {isOpen && (
        <Dropdown role="listbox" onClick={(e) => e.stopPropagation()}>
          {/* Clear option */}
          <Option
            role="option"
            $isSelected={!value}
            onClick={(e) => handleSelect(e, "")}
          >
            <OptionText $isPlaceholder>None</OptionText>
          </Option>

          {options.map((option) => (
            <Option
              key={option.value}
              role="option"
              $isSelected={option.value === value}
              onClick={(e) => handleSelect(e, option.value)}
              aria-selected={option.value === value}
            >
              {option.color && <ColorDot $color={option.color} />}
              <OptionText>{option.label}</OptionText>
              {option.value === value && <CheckIcon />}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}

/* --- Styled Components --- */

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button<{ $isOpen: boolean; $hasValue: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(84, 74, 57, 0.18);
  background: rgba(255, 255, 255, 0.75);

  font-family: "Caveat", cursive;
  font-size: 20px;
  font-weight: 500;
  color: ${({ $hasValue }) => ($hasValue ? "#3a3632" : "#9a9287")};
  text-align: left;

  cursor: pointer;
  outline: none;
  transition: box-shadow 150ms ease, border-color 150ms ease;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    border-color: rgba(84, 74, 57, 0.35);
    box-shadow: 0 0 0 4px rgba(84, 74, 57, 0.12);
  `}

  &:hover:not(:disabled) {
    border-color: rgba(84, 74, 57, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`;

const TriggerText = styled.span<{ $isPlaceholder: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? "#9a9287" : "#3a3632")};
`;

const ColorDot = styled.span<{ $color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #6b5f50;
  transition: transform 200ms ease;
  flex-shrink: 0;

  ${({ $isOpen }) => $isOpen && `transform: rotate(180deg);`}
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 100;

  background: #fffcf7;
  border: 1px solid rgba(84, 74, 57, 0.2);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);

  max-height: 220px;
  overflow-y: auto;
  padding: 6px;

  animation: dropdownFadeIn 180ms ease;

  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Option = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 120ms ease;

  background: ${({ $isSelected }) =>
    $isSelected ? "rgba(139, 106, 61, 0.12)" : "transparent"};

  &:hover {
    background: ${({ $isSelected }) =>
      $isSelected ? "rgba(139, 106, 61, 0.18)" : "rgba(0, 0, 0, 0.04)"};
  }
`;

const OptionText = styled.span<{ $isPlaceholder?: boolean }>`
  font-family: "Caveat", cursive;
  font-size: 18px;
  font-weight: 500;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? "#9a9287" : "#3a3632")};
  flex: 1;
`;

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#8b6a3d"
    viewBox="0 0 16 16"
  >
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  </svg>
);
