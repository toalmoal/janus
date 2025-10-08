import { inject,
         signal,
         Signal,
         Injectable,
         TemplateRef,
         WritableSignal }   from '@angular/core';

import { NbDialogService }  from '@nebular/theme';

import * as _               from 'lodash-es';

import { Alert }            from 'model/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private dialogService = inject(NbDialogService);

  private _alerts: WritableSignal<Array<Alert>>;

  confirmDialogTemplate!: TemplateRef<any>;

  constructor() {
      this._alerts = signal<Array<Alert>>([]);
  }

  get alerts(): Signal<Array<Alert>> {
    return this._alerts.asReadonly();
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
    this._alerts.update((alerts: Array<Alert>) => [...alerts, alert]);
    if (removeTimeout > 0) {
      setTimeout(() => this.removeAlert(alert), 3000);
    }
  }

  removeAlert(alert: Alert) {
    this._alerts.update((alerts: Array<Alert>) => _.filter((v: Alert) => alert.uid != v.uid));
  }

}
