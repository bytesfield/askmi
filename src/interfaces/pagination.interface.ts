export default interface PaginationInterface<T> {
  page: number;
  pageCount: number;
  limit: number;
  total: number;
  records: T[];
}
