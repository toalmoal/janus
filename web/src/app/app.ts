import { signal,
         Component, 
         AfterViewInit,
         ViewChild,
         TemplateRef}      from '@angular/core';
import { RouterOutlet }   from '@angular/router';

import { NbCardModule,
         NbButtonModule } from '@nebular/theme';
import { AlertService } from 'service/alert.service';

@Component({
  selector: 'janus-app',
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
  imports: [RouterOutlet, NbCardModule, NbButtonModule]
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

}
