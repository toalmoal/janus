import { Injectable }             from '@angular/core';
import { HttpClient,
         HttpResponse }           from '@angular/common/http';

import { of,
         Observable }             from 'rxjs';
import { map,
         catchError }             from 'rxjs/operators';

import * as _                     from 'lodash-es';

import { User }                   from 'model/user.model';
import * as utils                 from 'app/utils';
import { AuthStatus }             from 'model/auth-status.model';
import { environment }            from 'environments/environment';
import { ServerResponse }         from 'model/server-response.model';
import { StorageService }         from 'service/storage.service';
import { AuthStatusService }      from 'service/auth-status.service';

const tpe: string = 'User';
const credentialsKey = 'janus.credentials';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private authStatusService: AuthStatusService) {
    this.authStatusService.setAsGuest();
  }

  login(email: string, password: string, remember: boolean = false) {
    return this.http.post<any>(utils.serverUrl(environment.server, 'api/auth'), { email, password }, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ServerResponse>) => {
            const authStatus = this.applyUserResponse(httpResponse);
            if (authStatus.authenticated && remember) {
              const credentials = { email, password };
              this.storageService.set(credentialsKey, credentials);
            }
            return authStatus;
        }),
        catchError((err: any) => {
          return of(this.applyUserResponse(err));
        })
      );
  }

  loginWithStoredCredentials(): Observable<any> {
    const self = this;
    const credentials = self.storageService.get(credentialsKey);
    if (!_.isNil(credentials)) {
      return self.login(credentials.email, credentials.password);
    } else {
      return of(undefined);
    }
  }

  logout(): any {
    this.authStatusService.setAsGuest();
    this.storageService.remove(credentialsKey);
  }

  private applyUserResponse(httpResponse: any): AuthStatus {
    const response = { ... httpResponse.body };
    let r: AuthStatus;
    if (httpResponse.status === 200 && response.status === 'success') {
      const userOpt = utils.find<User>(response.value, tpe);
      if (userOpt) {
        const token = httpResponse.headers.get('Access-Token');
        if (token) {
          r = { user: userOpt, authenticated: true, token } as AuthStatus;
        } else {
          r = this.authStatusService.getValue();
          r.authenticated = true;
          r.user = userOpt;
        }
      } else {
        const err = response.value[0];
        r = this.authStatusService.getGuestAuthStatus(err.msg);
      }
      this.authStatusService.setValue(r);
    } else {
      r = this.authStatusService.getGuestAuthStatus(utils.getErrorInResponse(httpResponse['error'] ?? httpResponse));
    }

    return r;
  }

};
