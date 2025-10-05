import { Router,
         ActivatedRoute }       from '@angular/router';
import { inject,
         OnInit,
         Component }            from '@angular/core';
import { FormGroup,
         Validators,
         FormBuilder, 
         FormsModule,
         ReactiveFormsModule }  from '@angular/forms';

import { NbCardModule,
         NbAlertModule,
         NbInputModule,
         NbButtonModule,
         NbLayoutModule,
         NbCheckboxModule }     from '@nebular/theme';

import * as utils               from 'app/utils';
import { AuthStatus }           from 'model/auth-status.model';
import { AuthService }          from 'service/auth.service';
import { AlertService }         from 'service/alert.service';
import { AuthStatusService }    from 'service/auth-status.service';

const emailRegEx: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

@Component({
  standalone: true,
  selector: 'janus-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  imports: [FormsModule, ReactiveFormsModule, NbCardModule, NbInputModule, NbButtonModule, NbLayoutModule, NbCheckboxModule,
            NbAlertModule]
})
export class LoginComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private authStatusService = inject(AuthStatusService);

  loginForm: FormGroup;
  
  constructor() {
    this.loginForm = this.formBuilder.group({
      'email': [null, [
        Validators.required,
        Validators.pattern(emailRegEx)]
      ],
      'password': [null, [
        Validators.required,
        Validators.minLength(8)
      ]],
      'remember': [false, [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    if (this.authStatusService.authenticated) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.authService.login(this.loginForm.get('email')!.value,
                           this.loginForm.get('password')!.value,
                           utils.isTruthy(this.loginForm.get('remember')!.value))
      .subscribe(
        (v: AuthStatus) => {
          if (v) {
            if (v.authenticated) {
              const _s = this.route.snapshot.queryParams['_s'] || '/';
              this.router.navigateByUrl(_s);
            } else {
              this.alertService.danger(v.statusMessage ?? 'An unknown error occured! Please try again.');
            }
          } else {
            this.alertService.danger('An unknown error occured! Please try again.');
          }
        },
        (err: any) => {
          this.alertService.danger(utils.getErrorInResponse(err));
        }
      );
  }

}
