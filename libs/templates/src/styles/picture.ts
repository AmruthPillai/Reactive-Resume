import { Basics } from "@reactive-resume/schema";
import styled from "styled-components";

export const Picture = styled.img<{ $picture: Basics["picture"] }>`
  width: ${({ $picture }) => $picture.size}px;
  aspect-ratio: ${({ $picture }) => $picture.aspectRatio};
  border-radius: ${({ $picture }) => $picture.borderRadius}px;

  ${({ $picture }) => $picture.effects.grayscale && `filter: grayscale(1);`}
  ${({ $picture }) => $picture.effects.border && `border: 2px solid var(--color-primary);`}
`;
