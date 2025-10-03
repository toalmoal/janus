import { v4 as uuidv4 } from 'uuid';

class Context {

  contextId: string;
  email?: string;
  userId?: number;
  roles?: Array<string>;
  ipAddress?: string;

  constructor(email?: string, userId?: number, roles?: Array<string>, ipAddress?: string) {
    this.contextId = uuidv4();
    this.email = email;
    this.userId = userId;
    this.roles = roles;
    this.ipAddress = ipAddress;
  }

  static empty: Context = new Context();

  static hasRole = (role: string, roles?: Array<string>) => {
    return (roles ?? []).indexOf('Admin') > -1 || (roles ?? []).indexOf(role) > -1;
  }

  get isAdmin(): boolean {
    return Context.hasRole('Admin', this.roles);
  }

  get isUser(): boolean {
    return Context.hasRole('User', this.roles);
  }

}
export default Context;
