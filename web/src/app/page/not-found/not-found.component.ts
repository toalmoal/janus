import { Router }         from '@angular/router';
import { Component }      from '@angular/core';

import { NbCardModule,
         NbButtonModule,
         NbLayoutModule } from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'janus-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
  imports: [NbCardModule, NbButtonModule, NbLayoutModule]
})
export class NotFoundComponent {

  constructor(private router: Router) {
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

}
