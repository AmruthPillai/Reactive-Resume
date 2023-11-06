import styled from "styled-components";

export const RhyhornStyles = styled.div`
  display: grid;
  row-gap: 16px;

  .header {
    display: flex;

    &__picture {
      align-self: center;
      margin-right: 12px;
    }

    &__basics {
      align-self: center;
    }

    &__name {
      font-size: 1.5rem;
      line-height: calc(var(--line-height) + 0.5rem);
    }

    &__meta {
      font-size: 0.875rem;
      line-height: var(--line-height);

      span {
        padding: 0 6px;
        border-right: 1px solid var(--color-primary);

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  .section {
    &__item {
      display: flex;
      flex-direction: column;
      gap: 4px;

      &-header {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 6px;

        & > div:last-child {
          text-align: right;
        }

        &:has(i) div {
          margin-left: 22px;
        }

        & > div > i {
          position: absolute;
          top: 6px;
          left: 0;
        }
      }

      &-content p:not(:last-child),
      &-main p:not(:last-child) {
        padding-bottom: 0.75rem;
      }

      & .rating {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;

        & > span {
          width: 8px;
          height: 8px;
          margin-left: 4px;
          border-radius: 50%;
          border: 1px solid currentColor;
        }
      }
    }
  }
`;
