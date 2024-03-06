import { UUID } from 'crypto';

export type List = {
  name: string;
  accessLevel: string;
  creatorId: number;
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

export type SupabaseReturnedList = {
  id: UUID;
  created_at: Date;
  list_name: string;
  access_level: string;
  description?: string;
  cyphered?: boolean;
};
