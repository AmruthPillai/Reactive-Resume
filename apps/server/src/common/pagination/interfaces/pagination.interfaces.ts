export interface PaginationInterface {
  data: any[];

  meta: {
    itemPerPage: number;
    totalItem: number;
    currentPage: number;
    totalPage: number;
  };
}
