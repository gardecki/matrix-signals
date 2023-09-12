import { Pipe, PipeTransform } from '@angular/core';
import { Point2D } from '../../types/point';
import { getPath } from '../../utils/path.utils';

@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {

  transform(points: Point2D[], lines: [number, number][], scale: number): unknown {
    return getPath(points, lines, scale);
  }

}
