import { Component }    from '@angular/core';

import { NbIconModule }     from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@Component({
  standalone: true,
  selector: 'janus-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  imports: [NbIconModule, NbEvaIconsModule]
})
export class FooterComponent {
}
