export type CreateUserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type GetUserData = { email?: string; id?: number };
