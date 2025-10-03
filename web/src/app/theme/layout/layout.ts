import { Component }    from '@angular/core';

import { NbMenuModule,
         NbLayoutModule,
         NbSidebarModule }  from '@nebular/theme';

import { HeaderComponent }  from 'theme/components/header/header.component';
import { FooterComponent }  from 'theme/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'janus-layout',
  styleUrls: ['./layout.scss'],
  templateUrl: './layout.html',
  imports: [NbMenuModule, NbLayoutModule, NbSidebarModule,
            HeaderComponent, FooterComponent],
})
export class LayoutComponent {}
