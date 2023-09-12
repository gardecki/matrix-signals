import { Component, computed, inject, Signal } from '@angular/core';
import { projectOrthogonal } from '../../consts/projectors';
import { DragDropService } from '../../services/drag-drop.service';
import { RotationService } from '../../services/rotation.service';
import { ViewportService } from '../../services/viewport.service';
import { Point2D, Point3D } from '../../types/point';
import { getPath } from '../../utils/path.utils';
import { CUBE } from '../../consts/cube';


@Component({
  templateUrl: './second-projection.component.html',
  styleUrls: ['./second-projection.component.scss'],
})
export class SecondProjectionComponent {
  viewport = inject(ViewportService);
  rotation = inject(RotationService);
  dragDrop = inject(DragDropService);

  rotatedPoints: Signal<Point3D[]> = computed(() => {
    const rotate = this.rotation.rotate();
    return CUBE.points.map(rotate);
  })

  points: Signal<Point2D[]> = computed(() => {
    const [width, height] = [this.viewport.width(), this.viewport.height()];
    const [dx, dy] = [width / 2, height / 2];
    const scale: number = Math.min(width, height) * 0.25;

    return this.rotatedPoints()
      .map(projectOrthogonal)
      .map(([x, y]) => [scale * x + dx, scale * y + dy]);
  });

  path: Signal<string> = computed(() => 
    getPath(this.points(), CUBE.lines)
  );

  constructor() {
    this.dragDrop.rotationChange$.subscribe(([x, y]) => {
      this.rotation.xRotation.set(x);
      this.rotation.yRotation.set(y);
    });
  }
}