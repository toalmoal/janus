import { inject,
         OnInit,
         Component,
         OnDestroy }                    from '@angular/core';

import { NbMenuItem,
         NbIconModule,
         NbUserModule,
         NbMenuService,
         NbSearchModule,
         NbSelectModule,
         NbActionsModule,
         NbSidebarService,
         NbLayoutDirection,
         NbContextMenuModule,
         NbLayoutDirectionService }     from '@nebular/theme';

import { NbEvaIconsModule }             from '@nebular/eva-icons';

import { filter,
         takeUntil }                    from 'rxjs/operators';
import { Subject }                      from 'rxjs';

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
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  private nbMenuService = inject(NbMenuService,);
  private nbSidebarService = inject(NbSidebarService,);
  private nbLayoutDirectionService = inject(NbLayoutDirectionService,);

  private authService = inject(AuthService,);
  private alertService = inject(AlertService);
  private menuOptionsService = inject(MenuOptionsService);

  user = {
    name: 'Administrator',
    img: 'male.svg'
  };
  userPictureOnly: boolean = false;
  userMenu = [ 
    { title: 'Profile', action: () => console.log('profile') }, 
    { title: 'Log out', action: () => this.confirmLogout() }
  ];

  constructor() {
  }

  ngOnInit() {
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
