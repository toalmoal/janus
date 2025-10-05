import { inject, Injectable }       from '@angular/core';

import { NbMenuItem }               from '@nebular/theme';

@Injectable({ providedIn: 'root' })
export class MenuOptionsService {

  HOME_MENU_ITEM: NbMenuItem = {
    title: 'Home',
    icon: 'home-outline',
    link: '/page/landing',
    home: true,
  };

  NOT_FOUND_MENU_ITEM: NbMenuItem = {
    title: '404',
    icon: 'alert-triangle-outline',
    link: '/not-found'
  };

  constructor() {
  }

  get initialCollapsed(): boolean {
    return true;
  }

  get initialRTL(): boolean {
    return true;
  }

  get items(): Array<NbMenuItem> {
    return [this.HOME_MENU_ITEM, this.NOT_FOUND_MENU_ITEM];
  }

};
