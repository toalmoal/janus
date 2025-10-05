import { inject,
         Injectable }               from '@angular/core';
import { Router,
         RouterStateSnapshot,
         ActivatedRouteSnapshot }   from '@angular/router';

import * as _                       from 'lodash-es';

import { AuthStatusService }        from 'service/auth-status.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  private router = inject(Router);
  private authStatusService = inject(AuthStatusService);

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles = route.data['roles'] as Array<string> || [];

    if (this.authStatusService.authenticated) {
      const userRoles = this.authStatusService.roles;
      let hasRole = _.intersection(['Admin'], userRoles).length > 0 || _.intersection(roles, userRoles).length > 0;

      return roles.length == 0 || hasRole;
    } else {
      const _s = route.queryParams['_s'] || state.url;
      this.router.navigate(['/login'], { queryParams: { _s: _s }});
      return false;
    }
  }

}
