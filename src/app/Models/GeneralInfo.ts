
import { User } from './User';

export interface GeneralInfo {
  id: number;
  name: string;
  logo: string;
  path: string;
  style: any;
  users: User[];
}
