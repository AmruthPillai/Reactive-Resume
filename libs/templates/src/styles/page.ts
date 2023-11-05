import styled from "styled-components";

export const PageWrapper = styled.div`
  position: relative;

  width: var(--page-width);
  padding: var(--page-margin);
  min-height: var(--page-height);

  /* Theme */
  color: var(--color-text);
  background-color: var(--color-background);

  @media print {
    margin: 0 auto;

    &:not(:last-child) {
      height: var(--page-height);
    }
  }
`;

export const PageNumber = styled.p`
  top: 0;
  right: 0;
  color: black;
  font-size: 12px;
  font-weight: 600;
  padding: 0 0.5rem;
  position: absolute;
  outline: 1px solid black;
  background-color: white;
`;

export const PageBreakLine = styled.div<{ $pageHeight: number }>`
  position: absolute;
  top: ${({ $pageHeight }) => $pageHeight}mm;
  left: 0;
  right: 0;
  z-index: 10;
  border: 1px dashed var(--color-text);

  /* Text */
  &:before {
    content: "End of Page";
    background: white;
    color: black;
    display: block;
    font-size: 12px;
    font-weight: 600;
    height: auto;
    line-height: 0rem;
    padding: 12px 16px;
    position: absolute;
    right: 0;
    text-align: right;
    top: -25px;
  }
`;
