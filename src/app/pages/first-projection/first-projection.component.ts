import { Component } from '@angular/core';
import { CUBE } from '../../consts/cube';
import { projectOrthogonal } from '../../consts/projectors';
import { Point2D } from '../../types/point';
import { getPath } from '../../utils/path.utils';

@Component({
  templateUrl: './first-projection.component.html',
  styleUrls: ['./first-projection.component.scss'],
})
export class FirstProjectionComponent {
  points: Point2D[] = CUBE.points.map(projectOrthogonal);
  path: string = getPath(this.points, CUBE.lines);
}