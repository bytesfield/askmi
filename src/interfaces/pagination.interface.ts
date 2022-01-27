export default interface Pagination<T> {
  page: number;
  pageCount: number;
  limit: number;
  total: number;
  records: T[];
}
