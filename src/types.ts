export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserStructure extends UserCredentials {
  email: string;
}
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
