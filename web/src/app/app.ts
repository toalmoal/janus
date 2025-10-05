import { signal,
         inject,
         Component, 
         ViewChild,
         TemplateRef,
         AfterViewInit }  from '@angular/core';
import { AsyncPipe }      from '@angular/common';
import { RouterOutlet }   from '@angular/router';

import { NbCardModule,
         NbAlertModule,
         NbButtonModule } from '@nebular/theme';

import { Observable }     from 'rxjs';

import { Alert }          from 'model/alert.model';
import { AlertService }   from 'service/alert.service';

@Component({
  selector: 'janus-app',
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
  imports: [AsyncPipe, RouterOutlet, NbCardModule, NbAlertModule, NbButtonModule]
})
export class App implements AfterViewInit {
  protected readonly title = signal('web');

  private alertService = inject(AlertService);

  @ViewChild('confirmDialog', { read: TemplateRef })
  confirmDialogTemplate!:TemplateRef<any>;

  constructor() {
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
