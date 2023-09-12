import { Component, computed, inject, Signal } from '@angular/core';
import { Point2D } from 'src/app/types/point';
import { MouseService } from '../../services/mouse.service';
import { ViewportService } from '../../services/viewport.service';

@Component({
  templateUrl: './third-signal.component.svg',
  styleUrls: ['./third-signal.component.scss']
})
export class ThirdSignalComponent {
  private viewport = inject(ViewportService);
  private mouse = inject(MouseService);

  width: Signal<number> = this.viewport.width;
  height: Signal<number> = this.viewport.height;
  mousePosition: Signal<Point2D> = this.mouse.mousePosition;

  percentagePosition: Signal<Point2D> = computed(() => {
    const [x, y] = this.mousePosition();
    const width = this.width();
    const height = this.height();
    return [x / width, y / height];
  })
}


