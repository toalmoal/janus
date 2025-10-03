import { ApplicationConfig,
         provideZonelessChangeDetection,
         provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter }                      from '@angular/router';

import { routes }                             from './app.routes';

export const config: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners()
  ]
};
