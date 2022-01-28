
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
}

export interface UserLoginInterface {
  email: UserInterface['email'];
  password: UserInterface['password'];
}
