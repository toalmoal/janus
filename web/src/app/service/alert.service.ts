import { Injectable,
         TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  confirmDialogTemplate!: TemplateRef<any>;

  constructor(private dialogService: NbDialogService) { }

  confirm(title: String, subTitle: string, onConfirm: () => void = () => { }, onCancel: () => void = () => { }) {
    if (this.confirmDialogTemplate) {
      this.dialogService.open(this.confirmDialogTemplate, { context: { title, subTitle, onConfirm, onCancel }});
    }
  }

}
