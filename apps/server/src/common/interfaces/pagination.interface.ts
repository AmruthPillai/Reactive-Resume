export interface PaginationInterface<T> {
  data: T[];

  meta: {
    itemPerPage: number;
    totalItem: number;
    currentPage: number;
    totalPage: number;
  };
}
