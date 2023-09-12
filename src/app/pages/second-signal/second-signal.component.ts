import { Component, inject, Signal } from '@angular/core';
import { MouseService } from 'src/app/services/mouse.service';
import { Point2D } from 'src/app/types/point';

@Component({
  template: `<p>{{ mousePosition() }}</p>`,
  styleUrls: ['./second-signal.component.scss']
})
export class SecondSignalComponent {
  private mouseService = inject(MouseService);

  mousePosition: Signal<Point2D> = this.mouseService.mousePosition;
}


