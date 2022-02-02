
export interface BaseUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  emailVerifiedAt: Date;
}

export interface UserInterface extends BaseUserInterface {
  createdAt?: Date;
  updatedAt?: Date;
  createUser?(item: object): Promise<UserInterface>;
  updateUser?(id: number, item: object): Promise<UserInterface>;
  findUserByEmail?(email: string): Promise<UserInterface>;
  findUserByMultiple?(obj: object): Promise<UserInterface>;
  deleteUser?(id: number): Promise<boolean>;
}

export interface UserLoginInterface {
  email: UserInterface['email'];
  password: UserInterface['password'];
}
