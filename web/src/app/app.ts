import { signal,
         Component, 
         AfterViewInit,
         ViewChild,
         TemplateRef,
         ChangeDetectionStrategy }  from '@angular/core';
import { AsyncPipe }                from '@angular/common';
import { RouterOutlet }             from '@angular/router';

import { NbCardModule,
         NbAlertModule,
         NbButtonModule }           from '@nebular/theme';

import { Alert }                    from 'model/alert.model';
import { Observable } from 'rxjs';
import { AlertService }             from 'service/alert.service';

@Component({
  selector: 'janus-app',
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet, NbCardModule, NbAlertModule, NbButtonModule]
})
export class App implements AfterViewInit {

  protected readonly title = signal('web');

  @ViewChild('confirmDialog', { read: TemplateRef })
  confirmDialogTemplate!:TemplateRef<any>;

  constructor(private alertService: AlertService) {
  }

  ngAfterViewInit(): void {
    this.alertService.confirmDialogTemplate = this.confirmDialogTemplate;
  }

  get alerts(): Observable<Array<Alert>> {
    return this.alertService.alerts;
  }

  closeAlert(v: Alert) {
    this.alertService.removeAlert(v);
  }

}
