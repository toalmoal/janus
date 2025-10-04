import { inject }         from "@angular/core";

import { firstValueFrom } from "rxjs";

import { AuthService }    from "service/auth.service";

export class AppInit {

  static init = async() => {
    console.log('Initializing...');

    const authService: AuthService = inject(AuthService);

    return firstValueFrom(authService.loginWithStoredCredentials())
  }

}
