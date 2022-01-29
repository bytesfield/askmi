export default (total: number, query: Record<string, any>): {
  page: number;
  limit: number;
  skip: number;
  pageCount: number;
  total: number;
} => {
  const pageAsNumber = parseInt(query.page);
  const limitAsNumber = parseInt(query.limit);

  let page = 0;
  if (!isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let limit = 10;
  if (!isNaN(limitAsNumber) && limitAsNumber > 0 && limitAsNumber < 10) {
    limit = limitAsNumber;
  }

  const skip = page * limit;
  const pageCount = Math.ceil(total / limit);

  return {
    page,
    limit,
    skip,
    pageCount,
    total
  };
};
