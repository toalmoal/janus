import { signal,
         inject,
         Signal,
         Injectable,
         WritableSignal }           from '@angular/core';

import { NbMenuItem }               from '@nebular/theme';

import * as _                       from 'lodash-es';

import { AuthStatusService }        from './auth-status.service';

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

  private authStatusService: AuthStatusService = inject(AuthStatusService);

  private _items: WritableSignal<Array<NbMenuItem>>;

  constructor() {
    this._items = signal([this.HOME_MENU_ITEM, this.NOT_FOUND_MENU_ITEM]);
  }

  get initialCollapsed(): boolean {
    return true;
  }

  get initialRTL(): boolean {
    return false;
  }

  get items(): Signal<Array<NbMenuItem>> {
    return this._items.asReadonly();
  }

};
