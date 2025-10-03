import { Component,
         ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'janus-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class LandingComponent {

  constructor() { }

}
