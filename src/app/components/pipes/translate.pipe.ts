import { Pipe, PipeTransform } from '@angular/core';
import { Point2D } from 'src/app/types/point';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform([x, y]: Point2D): unknown {
    return `translate(${x}, ${y})`;
  }

}
