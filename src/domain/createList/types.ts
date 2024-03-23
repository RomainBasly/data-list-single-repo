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

export type ReturnedInvitedUsers = {
  email: string;
  list_id: UUID;
  is_already_active_user: boolean;
  is_already_invited: boolean;
  user_id: UUID | null;
};
