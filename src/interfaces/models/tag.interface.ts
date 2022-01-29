
export interface BaseTagInterface {
  id: number;
  name: string;
  description: string;
}

export interface TagInterface extends BaseTagInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
