import { RoleAssignments } from "../../common/types/api";

export interface IAppUserRepository {}

export type CreateUser = {
  email: string;
  password: string;
  refreshToken?: string;
  roles: RoleAssignments;
};
