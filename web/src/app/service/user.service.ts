import { inject,
         Injectable }             from '@angular/core';
import { HttpClient }             from '@angular/common/http';

import { Observable }             from 'rxjs';
import { map,
         first }                  from 'rxjs/operators';

import * as _                     from 'lodash-es';

import { User }                   from 'model/user.model';
import * as utils                 from 'app/utils';
import { environment }            from 'environments/environment';
import { ServerResponse }         from 'model/server-response.model';

const tpe: string = 'User';

@Injectable({ providedIn: 'root' })
export class UserService {

  private http = inject(HttpClient);

  constructor() {
  }

  findAll(): Observable<Array<User>> {
    return this.http.get<any>(utils.serverUrl(environment.server, `api/user`))
      .pipe(
        first(),
        map((serverResponse: ServerResponse) => utils.findAllInServerResponse<User>(serverResponse, tpe))
      );
  }

  insert(email: string, password: string, firstName: string, lastName: string, role: string): Observable<Array<User>> {
    return this.http.post<any>(utils.serverUrl(environment.server, `api/user`), { email, password, firstName, lastName, role })
      .pipe(
        first(),
      );
  }

  updatePassword(email: string, password: string): Observable<any> {
    return this.http.put<any>(utils.serverUrl(environment.server, `api/user`), { email, password })
      .pipe(
        first(),
      );
  }

  updateStatus(email: string, disabled: boolean): Observable<any> {
    return this.http.put<any>(utils.serverUrl(environment.server, `api/user`), { email, disabled })
      .pipe(
        first(),
      );
  }

}
