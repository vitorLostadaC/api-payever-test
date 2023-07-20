import { SingleResponse } from './apiSchema';

export interface UserReqresSchema {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type UserReqresResponseSchema = SingleResponse<UserReqresSchema>;
