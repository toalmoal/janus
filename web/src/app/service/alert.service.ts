import { inject,
         Injectable,
         TemplateRef }      from '@angular/core';

import { NbDialogService }  from '@nebular/theme';

import { Observable,
         BehaviorSubject }  from 'rxjs';

import * as _               from 'lodash-es';

import { Alert }            from 'model/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private dialogService = inject(NbDialogService);

  private alerts$: BehaviorSubject<Array<Alert>>;

  confirmDialogTemplate!: TemplateRef<any>;

  constructor() {
      this.alerts$ = new BehaviorSubject<Array<Alert>>([]);
  }

  get alerts(): Observable<Array<Alert>> {
    return this.alerts$.asObservable();
  }

  confirm(title: String, subTitle: string, onConfirm: () => void = () => { }, onCancel: () => void = () => { }) {
    if (this.confirmDialogTemplate) {
      this.dialogService.open(this.confirmDialogTemplate, { context: { title, subTitle, onConfirm, onCancel }});
    }
  }

  basic(message: string, removeTimeout: number = 3000) {
    this.addAlertOfType('basic', message, removeTimeout);
  }

  primary(message: string, removeTimeout: number = 3000) {
    this.addAlertOfType('primary', message, removeTimeout);
  }

  success(message: string, removeTimeout: number = 3000) {
    this.addAlertOfType('success', message, removeTimeout);
  }

  info(message: string, removeTimeout: number = 3000) {
    this.addAlertOfType('info', message, removeTimeout);
  }

  danger(message: string, removeTimeout: number = 3000) {
    this.addAlertOfType('danger', message, removeTimeout);
  }

  warning(message: string, removeTimeout: number = 3000) {
    this.addAlertOfType('warning', message, removeTimeout);
  }

  addAlertOfType(type: string, message: string, removeTimeout: number = 3000) {
    this.addAlert({
      uid: _.uniqueId('alert_'),
      type,
      message
    }, removeTimeout);
  }

  addAlert(alert: Alert, removeTimeout: number = 3000) {
    const alerts = this.alerts$.value;
    alerts.push(alert);
    this.alerts$.next(alerts);
    if (removeTimeout > 0) {
      setTimeout(() => this.removeAlert(alert), 3000);
    }
  }

  removeAlert(alert: Alert) {
    const alerts = this.alerts$.value;
    const index = alerts.findIndex((v: Alert) => alert.uid == v.uid);
    if (index > -1) {
      alerts.splice(index, 1);
    }
    this.alerts$.next(alerts);
  }

}
