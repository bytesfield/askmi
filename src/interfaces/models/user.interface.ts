
export interface BaseUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UserInterface extends BaseUserInterface {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserLoginInterface {
  email: UserInterface['email'];
  password: UserInterface['password'];
}
