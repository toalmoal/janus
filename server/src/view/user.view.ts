import * as _       from 'lodash';

import { User }     from 'entity/user.entity'

export class UserView {
  id: number;
  email: string;
  name: string;
  firstName: string;
  lastName?: string|null;
  roles: Array<string>;
  disabled: boolean;

  constructor(id: number, email: string, firstName: string, lastName: string|null|undefined, roles: string, disabled: boolean) {
    this.id = id;
    this.email = email;
    this.name = _.trim(firstName + ' ' + (lastName || ''));
    this.firstName = firstName;
    this.lastName = lastName;
    this.roles = roles.split(',');
    this.disabled = disabled;
  }

  static toView(user: User): any {
    const v = new UserView(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.roles,
      user.disabled,
    );
    return v;
  }

}
