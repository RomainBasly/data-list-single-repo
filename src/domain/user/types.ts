import { RoleAssignments } from "../../common/types/api";

export interface IAppUserRepository {}

export type User = {
  email: string;
  password: string;
  refreshToken?: string;
  roles: RoleAssignments;
};
