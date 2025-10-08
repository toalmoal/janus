import { inject,
         effect,
         OnInit,
         Signal,
         computed,
         Component }                    from '@angular/core';
import { toSignal }                     from '@angular/core/rxjs-interop';

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
         NbMediaBreakpoint,
         NbContextMenuModule,
         NbLayoutDirectionService,
         NbMediaBreakpointsService }    from '@nebular/theme';

import { NbEvaIconsModule }             from '@nebular/eva-icons';

import * as _                           from 'lodash-es';

import { AuthService }                  from 'service/auth.service';
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
export class HeaderComponent implements OnInit {

  private nbMenuService = inject(NbMenuService,);
  private nbThemeService = inject(NbThemeService);
  private nbSidebarService = inject(NbSidebarService);
  private nbBreakpointService = inject(NbMediaBreakpointsService);
  private nbLayoutDirectionService = inject(NbLayoutDirectionService,);

  private authService = inject(AuthService,);
  private alertService = inject(AlertService);
  private menuOptionsService = inject(MenuOptionsService);

  protected user = {
    name: 'Administrator',
    img: 'user.svg'
  };
  protected userMenu = [
    { title: 'Profile', action: () => console.log('profile') },
    { title: 'Log out', action: () => this.confirmLogout() }
  ];

  protected themes = [
    { value: 'cosmic', name: 'Cosmic' },
    { value: 'corporate', name: 'Corporate' },
    { value: 'dark', name: 'Dark' },
    { value: 'default', name: 'Light' }
  ];

  protected currentTheme: Signal<string>;
  protected userPictureOnly: Signal<boolean>;
  private menuItemClicked = toSignal(this.nbMenuService.onItemClick());
  private themeChangeSignal = toSignal(this.nbThemeService.onThemeChange());
  private mediaQueryChangeSignal = toSignal(this.nbThemeService.onMediaQueryChange());

  constructor() {
    const { xl } = this.nbBreakpointService.getBreakpointsMap();

    this.currentTheme = computed(() => {
      return this.themeChangeSignal()?.name ?? this.nbThemeService.currentTheme;
    })
    this.userPictureOnly = computed(() => {
      const v: (NbMediaBreakpoint[] | undefined) = this.mediaQueryChangeSignal();
      return _.get(v, '1.width', 0) < xl;
    });

    effect(() => {
      const v: any = this.menuItemClicked();
      if (v?.tag === 'user-menu') {
        const action = v['item']['action'];
        if (action) {
          action();
        }
      }
    });
  }

  ngOnInit() {
    if (this.menuOptionsService.initialCollapsed) {
      setTimeout(() => this.toggleSidebar(), 0);
    }

    if (this.menuOptionsService.initialRTL) {
      setTimeout(() => this.nbLayoutDirectionService.setDirection(NbLayoutDirection.RTL), 0);
    }

  }

  get menu(): Signal<Array<NbMenuItem>> {
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
    this.authService.logout();
    //this.router.navigate([ '/login' ]);
    location.replace("/");
  }

}
