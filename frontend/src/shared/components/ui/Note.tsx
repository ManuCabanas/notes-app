import styled from "styled-components";
import type { Category } from "../../../api";
import { CategoryLabel } from "./CategoryLabel";

type NoteProps = {
  title: string;
  content: string;
  category: Category;
};

export function Note({ title, content, category }: NoteProps) {
  return (
    <NoteDiv>
      <Inner>
        <NoteHeader>
          <Title>{title}</Title>
          <CategoryLabel name={category.name} color={category.color} />
        </NoteHeader>
        <div style={{ paddingTop: "5px" }}>{content}</div>
      </Inner>
    </NoteDiv>
  );
}

const Inner = styled.div`
  padding-left: 10px;
`;

const NoteDiv = styled.div`
    width: 450px;
    height: 350px;
    display: flex-row;
    flex-direction: 
    gap: 5px;
    background-color: #F9F5ED;
    border: 1px solid #E6DFAF;
    border-radius: 10px;
    &:hover {
    background-color: #F2EBDC; /* un poco más oscuro */
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  widht: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-top: 5px;
`;

const Title = styled.div`
font-family: 'Patrick Hand', cursive,
  font-size: 30px;
  font-weight: 900;
  color: #46443fff;
`;
