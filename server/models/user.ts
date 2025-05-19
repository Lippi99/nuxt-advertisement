import { UserRole } from "~/types/role";

export interface User {
  id: number;
  name: string;
  email: string;
  birth: string;
  isSubscribed: boolean;
  lastName: string;
  organization: number | null;
  role: UserRole;
}
