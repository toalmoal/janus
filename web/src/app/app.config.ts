import { enableProdMode,
         InjectionToken,
         ApplicationConfig,
         importProvidersFrom,
         provideAppInitializer,
         provideZonelessChangeDetection,
         provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter }                      from '@angular/router';
import { withInterceptors,
         provideHttpClient }                  from '@angular/common/http';

import { JwtModule,
         JWT_OPTIONS }                        from '@auth0/angular-jwt';

import { NbDialogModule, NbMenuModule,
         NbSidebarModule,
         NbThemeModule }                      from '@nebular/theme';

import { DARK_THEME }                         from 'theme/styles/theme.dark';
import { COSMIC_THEME }                       from 'theme/styles/theme.cosmic';
import { DEFAULT_THEME }                      from 'theme/styles/theme.default';
import { CORPORATE_THEME }                    from 'theme/styles/theme.corporate';

import { routes }                             from 'app/app.routes';
import { AppInit }                            from 'app/init';
import { environment }                        from 'environments/environment';
import appHttpInterceptor                     from 'app/init/http.interceptor';
import { AuthStatusService }                  from 'service/auth-status.service';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window
});

if (environment.production) {
  enableProdMode();
  console.warn(`🚨 Console output is disabled`);
  // eslint-disable-next-line no-console
  console.log = function (): void { };
  console.debug = function (): void { };
  console.warn = function (): void { };
  // eslint-disable-next-line no-console
  console.info = function (): void { };
}

const jwtOptionsFactory = (authStatusService: AuthStatusService) => {
  return {
    tokenGetter: () => {
      return authStatusService.jwtToken;
    },
    allowedDomains: [ environment.server.host ],
    disallowedDomains: [`${environment.server.host}/api/auth`]
  }
};

export const config: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        appHttpInterceptor
      ])
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          deps: [ AuthStatusService ],
          useFactory: jwtOptionsFactory
        }
      })
    ),
    provideAppInitializer(() => AppInit.init()),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    { provide: Window, useValue: WINDOW },
    importProvidersFrom(NbMenuModule.forRoot()),
    importProvidersFrom(NbDialogModule.forRoot()),
    importProvidersFrom(NbSidebarModule.forRoot()),
    importProvidersFrom(
      NbThemeModule.forRoot(
      { name: 'default' },
      [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ])
    )
  ]
};
