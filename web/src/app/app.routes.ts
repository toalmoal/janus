import { Routes }             from '@angular/router';

import { AuthGuard }          from 'app/init/auth.guard';
import { PageComponent }      from 'page/page.component';
import { LoginComponent }     from 'page/login/login.component';
import { LandingComponent }   from 'page/landing/landing.component';
import { NotFoundComponent }  from 'page/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'page',
    component: PageComponent,
    children: [
      { path: "landing", canActivate: [ AuthGuard ], component: LandingComponent },
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
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];
