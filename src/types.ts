export interface UserStructure {
  username: string;
  password: string;
  email: string;
}

export type UserCredentials = Pick<UserStructure, "email" | "password">;
export interface UserRegisterCredentials extends UserStructure {
  passwordConfirmation: string;
}

export interface Image {
  id: number;
  tittle: string;
  description: string;
  source: string;
  prompt: string;
  category: string;
}
