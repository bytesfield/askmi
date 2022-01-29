
export interface BaseViewInterface {
  id: number;
  viewCount: number;
}

export interface ViewInterface extends BaseViewInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
