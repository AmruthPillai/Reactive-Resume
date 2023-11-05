import styled from "styled-components";

export const ItemGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(${({ $columns }) => $columns ?? 1}, 1fr);
`;

export const PageGrid = styled.div<{ $offset: number }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  column-gap: ${({ $offset }) => $offset}px;
`;
