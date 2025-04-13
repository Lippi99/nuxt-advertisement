import { UserRole } from "~/types/role";

export interface User {
  id: number;
  name: string;
  lastName: string;
  role: UserRole;
}
