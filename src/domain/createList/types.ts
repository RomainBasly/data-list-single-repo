export type List = {
  name: string;
  accessLevel: string;
  creatorEmail: string;
  emails?: string[];
  description?: string;
  cyphered?: boolean;
};
export type IInputAppList = {
  list_name: string;
  access_level: string;
  description?: string;
  cyphered?: boolean;
};

export interface EmailValidationResult {
  [email: string]: { email: string };
}
