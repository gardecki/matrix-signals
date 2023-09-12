import { Pipe, PipeTransform } from '@angular/core';
import { Point2D } from 'src/app/types/point';

@Pipe({
  name: 'border'
})
export class BorderPipe implements PipeTransform {

  transform([x, y]: Point2D, width: number, height: number, isHorizontal: boolean): unknown {
    if (isHorizontal) {
      return `M ${x} ${y} 
      L ${x + width} ${y} 
      L ${x + width} ${y + height}
      L ${x} ${y + height}
      L ${x} ${y}`;
    }
    return `M ${x} ${y} 
            L ${x + height} ${y} 
            L ${x + height} ${y + width}
            L ${x} ${y + width}
            L ${x} ${y}`;
    
  }

}
