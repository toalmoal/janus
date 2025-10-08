import { inject,
         Signal,
         Component }          from '@angular/core';

import { NbMenuItem,
         NbMenuModule,
         NbLayoutModule,
         NbSidebarModule}     from '@nebular/theme';

import { HeaderComponent }    from 'theme/components/header/header.component';
import { FooterComponent }    from 'theme/components/footer/footer.component';
import { MenuOptionsService } from 'service/menu-options.service';

@Component({
  standalone: true,
  selector: 'janus-layout',
  styleUrls: ['./layout.scss'],
  templateUrl: './layout.html',
  imports: [NbMenuModule, NbLayoutModule, NbSidebarModule,
            HeaderComponent, FooterComponent],
})
export class LayoutComponent {

  private menuOptionsService = inject(MenuOptionsService);

  get menu(): Signal<Array<NbMenuItem>> {
    return this.menuOptionsService.items;
  }

  get sidebarToRight(): (string | null) {
    return this.menuOptionsService.initialRTL? '': null;
  }

}
