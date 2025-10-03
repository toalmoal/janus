import User         from 'entity/user.entity'

import * as _       from 'lodash';

class UserView {
  id: number;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  roles: Array<string>;
  disabled: boolean;

  constructor(id: number, email: string, firstName: string, lastName: string, roles: string, disabled: boolean) {
    this.id = id;
    this.email = email;
    this.name = _.trim(firstName + ' ' + (lastName || ''));
    this.firstName = firstName;
    this.lastName = lastName;
    this.roles = roles.split(',');
    this.disabled = disabled;
  }

  static from(v: (User | Array<User>), wrap: boolean = true): any {
    if (v) {
      return Array.isArray(v)? UserView.toViews(v, wrap): UserView.toView(v, wrap);
    } else {
      return undefined;
    }
  }

  private static toView(user: User, wrap: boolean = true): any {
    const v = new UserView(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.roles,
      user.disabled
    );
    if (wrap) {
      return { 'User': v };
    } else {
      return v;
    }
  }

  private static toViews(users: Array<User>, wrap: boolean = true): Array<any> {
      return _.map(users, (user: User) => {
          return UserView.toView(user, wrap);
      });
  }

}
export default UserView;
