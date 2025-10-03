import { Router }           from '@angular/router';
import { Component }        from '@angular/core';

import { NbCardModule,
         NbInputModule,
         NbButtonModule,
         NbLayoutModule,
         NbCheckboxModule } from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'janus-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  imports: [NbCardModule, NbInputModule, NbButtonModule, NbLayoutModule, NbCheckboxModule]
})
export class LoginComponent {

  constructor(private router: Router) {
  }

  gotoHome() {
    this.router.navigate(['/page']);
  }

}
