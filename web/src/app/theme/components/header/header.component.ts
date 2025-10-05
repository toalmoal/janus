import { inject,
         OnInit,
         Component,
         OnDestroy }                    from '@angular/core';
import { Router }                       from '@angular/router';

import { NbMenuItem,
         NbIconModule,
         NbUserModule,
         NbMenuService,
         NbSearchModule,
         NbSelectModule,
         NbThemeService,
         NbActionsModule,
         NbSidebarService,
         NbLayoutDirection,
         NbContextMenuModule,
         NbLayoutDirectionService,
         NbMediaBreakpointsService }    from '@nebular/theme';

import { NbEvaIconsModule }             from '@nebular/eva-icons';

import { filter, map,
         takeUntil }                    from 'rxjs/operators';
import { Subject }                      from 'rxjs';

import { AlertService }                 from 'service/alert.service';
import { MenuOptionsService }           from 'service/menu-options.service';

@Component({
  standalone: true,
  selector: 'janus-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  imports: [NbIconModule, NbUserModule, NbSearchModule, NbSelectModule,
            NbEvaIconsModule, NbActionsModule, NbContextMenuModule]
})
export class HeaderComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private destroy$: Subject<void> = new Subject<void>();

  private nbMenuService = inject(NbMenuService,);
  private nbThemeService = inject(NbThemeService,);
  private nbSidebarService = inject(NbSidebarService,);
  private nbBreakpointService = inject(NbMediaBreakpointsService,);
  private nbLayoutDirectionService = inject(NbLayoutDirectionService,);

  private alertService = inject(AlertService);
  private menuOptionsService = inject(MenuOptionsService);

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

  constructor() {
  }

  ngOnInit() {
    this.currentTheme = this.nbThemeService.currentTheme;

    const { xl } = this.nbBreakpointService.getBreakpointsMap();
    this.nbThemeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.nbThemeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.nbMenuService.onItemClick()
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

    if (this.menuOptionsService.initialCollapsed) {
      setTimeout(() => this.toggleSidebar(), 0);
    }

    if (this.menuOptionsService.initialRTL) {
      setTimeout(() => this.nbLayoutDirectionService.setDirection(NbLayoutDirection.RTL), 0);
    }

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get menu(): Array<NbMenuItem> {
    return this.menuOptionsService.items;
  }

  changeTheme(themeName: string) {
    this.nbThemeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.nbSidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.nbMenuService.navigateHome();
    return false;
  }

  confirmLogout() {
    this.alertService.confirm('Logout?', 'Are you sure you want to logout?', () => this.logout());
  }

  logout() {
    this.router.navigate([ '/' ]);
  }

}
