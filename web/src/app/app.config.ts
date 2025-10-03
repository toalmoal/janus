import { InjectionToken,
         ApplicationConfig,
         importProvidersFrom,
         provideZonelessChangeDetection,
         provideBrowserGlobalErrorListeners}  from '@angular/core';
import { provideRouter }                      from '@angular/router';

import { routes }                             from './app.routes';

import { NbDialogModule, NbMenuModule,
         NbSidebarModule,
         NbThemeModule }                      from '@nebular/theme';

import { DARK_THEME }       from 'theme/styles/theme.dark';
import { COSMIC_THEME }     from 'theme/styles/theme.cosmic';
import { DEFAULT_THEME }    from 'theme/styles/theme.default';
import { CORPORATE_THEME }  from 'theme/styles/theme.corporate';

import {  } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window
});

export const config: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    { provide: Window, useValue: WINDOW },
    importProvidersFrom(NbMenuModule.forRoot()),
    importProvidersFrom(NbDialogModule.forRoot()),
    importProvidersFrom(NbSidebarModule.forRoot()),
    importProvidersFrom(
      NbThemeModule.forRoot(
      { name: 'dark' },
      [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ])
    )
  ]
};
