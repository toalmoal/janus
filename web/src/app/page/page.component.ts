import { inject,
         Component,
         ChangeDetectionStrategy }  from '@angular/core';
import { RouterOutlet }             from '@angular/router';

import { NbMenuItem,
         NbMenuModule }             from '@nebular/theme';

import { LayoutComponent }          from 'theme/layout/layout';
import { MenuOptionsService }       from 'service/menu-options.service';

@Component({
  standalone: true,
  selector: 'janus-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NbMenuModule, LayoutComponent]
})
export class PageComponent {

  private menuOptionsService = inject(MenuOptionsService);

  constructor() { 
  }

  get menu(): Array<NbMenuItem> {
    return this.menuOptionsService.items;
  }

}