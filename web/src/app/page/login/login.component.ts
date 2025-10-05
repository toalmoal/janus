import { Router }           from '@angular/router';
import { inject,
         Component }        from '@angular/core';

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

  private router = inject(Router);

  gotoHome() {
    this.router.navigate(['/page']);
  }

}
