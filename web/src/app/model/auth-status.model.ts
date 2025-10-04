import { User }  from 'model/user.model';

export interface AuthStatus {
  user?: User;
  token?: string;
  statusMessage?: string;
  authenticated: boolean;
};
