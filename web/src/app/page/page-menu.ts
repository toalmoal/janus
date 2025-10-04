import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/page/landing',
    home: true,
  },
  {
    title: '404',
    icon: 'alert-triangle-outline',
    link: '/not-found'
  }
];
