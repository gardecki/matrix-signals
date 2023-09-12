import { Component, Signal } from '@angular/core';
import { ViewportService } from '../../services/viewport.service';

@Component({
  template: `<p>{{ width() }} x {{ height() }}</p>`,
  styleUrls: ['./first-signal.component.scss']
})
export class FirstSignalComponent {  
  width: Signal<number> = this.viewport.width;
  height: Signal<number> = this.viewport.height;

  constructor(private viewport: ViewportService) {}
}

