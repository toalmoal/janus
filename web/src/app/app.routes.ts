import { Routes }             from '@angular/router';

import { PageComponent }      from 'page/page.component';
import { LoginComponent }     from 'page/login/login.component';
import { LandingComponent }   from 'page/landing/landing.component';
import { NotFoundComponent }  from 'page/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'page',
    component: PageComponent,
    children: [
      { path: "landing", component: LandingComponent },
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: '**', redirectTo: 'not-found' },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];
