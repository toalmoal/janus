import { Injectable }       from '@angular/core';

import { BehaviorSubject }  from 'rxjs';

import * as _               from 'lodash-es';

import { AuthStatus }       from 'model/auth-status.model';

const guestAuth: AuthStatus = {
  authenticated: false
} as AuthStatus;

@Injectable({ providedIn: 'root' })
export class AuthStatusService {

  private authStatus$: BehaviorSubject<AuthStatus>;

  constructor() {
    this.authStatus$ = new BehaviorSubject<AuthStatus>(guestAuth);
  }

  public getValue(): AuthStatus {
    return _.cloneDeep(this.authStatus$.value);
  }

  public getGuestAuthStatus(statusMessage?: string): AuthStatus {
    const auth = _.cloneDeep(guestAuth);
    auth.statusMessage = statusMessage;
    return auth;
  }

  public setAsGuest(statusMessage?: string): void {
    this.authStatus$.next(this.getGuestAuthStatus(statusMessage));
  }

  public setValue(status: AuthStatus): void {
    this.authStatus$.next(status);
  }

  get name(): (string|undefined) {
    return _.get(this.getValue(), 'user.name') ?? 'Guest';
  }

  get firstName(): (string|undefined) {
    return _.get(this.getValue(), 'user.firstName');
  }

  get lastName(): (string|undefined) {
    return _.get(this.getValue(), 'user.lastName');
  }

  get email(): (string|undefined) {
    return _.get(this.getValue(), 'user.email');
  }

  get authenticated(): boolean {
    return this.getValue().authenticated;
  }

  get jwtToken(): (string | undefined) {
    return this.getValue().token;
  }

  get roles(): Array<string> {
    return _.get(this.getValue(), 'user.roles', []);
  }

  public hasRole(role: string): boolean {
    return _.indexOf(this.roles, role) > -1;
  }

};
