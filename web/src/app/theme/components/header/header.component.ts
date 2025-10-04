import { OnInit,
         Component,
         OnDestroy }                    from '@angular/core';
import { Router }                       from '@angular/router';

import { NbIconModule,
         NbUserModule,
         NbMenuService,
         NbSearchModule,
         NbSelectModule,
         NbThemeService,
         NbActionsModule,
         NbSidebarService,
         NbContextMenuModule,
         NbMediaBreakpointsService }    from '@nebular/theme';

import { NbEvaIconsModule }             from '@nebular/eva-icons';

import { filter, map,
         takeUntil }                    from 'rxjs/operators';
import { Subject }                      from 'rxjs';

import { AuthService }                  from 'service/auth.service';
import { AlertService }                 from 'service/alert.service';

@Component({
  standalone: true,
  selector: 'janus-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  imports: [NbIconModule, NbUserModule, NbSearchModule, NbSelectModule, 
            NbEvaIconsModule, NbActionsModule, NbContextMenuModule]
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  user = {
    name: 'Administrator',
    img: 'user.svg'
  };
  userPictureOnly: boolean = false;
  userMenu = [ 
    { title: 'Profile', action: () => console.log('profile') }, 
    { title: 'Log out', action: () => this.confirmLogout() }
  ];

  themes = [
    { value: 'default', name: 'Light' },
    { value: 'dark', name: 'Dark' },
    { value: 'cosmic', name: 'Cosmic' },
    { value: 'corporate', name: 'Corporate' }
  ];
  currentTheme = 'default';

  constructor(private router: Router,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private sidebarService: NbSidebarService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .pipe(
        takeUntil(this.destroy$),
        filter(({ tag }: any) => tag === 'user-menu')
      )
      .subscribe((v: any) => {
        const action = v['item']['action'];
        if (action) {
          action();
        }
      });

    // Switch layout to RTL
    //this.layoutDirectionService.setDirection(NbLayoutDirection.RTL);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  confirmLogout() {
    this.alertService.confirm('Logout?', 'Are you sure you want to logout?', () => this.logout());
  }

  logout() {
    this.authService.logout();
    //this.router.navigate([ '/login' ]);
    location.replace("/");
  }

}
