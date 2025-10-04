import { Component,
         ChangeDetectionStrategy }  from '@angular/core';
import { RouterOutlet }             from '@angular/router';

import { NbMenuModule }             from '@nebular/theme';

import { MENU_ITEMS }               from './page-menu';
import { LayoutComponent }          from 'theme/layout/layout';

@Component({
  standalone: true,
  selector: 'janus-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NbMenuModule, LayoutComponent]
})
export class PageComponent {

  menu = MENU_ITEMS;

  constructor() { 
  }

}