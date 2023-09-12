import { Injectable } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { filter, fromEvent, map, Observable, pairwise, switchMap, takeUntil } from "rxjs";
import { Point2D } from "../types/point";
import { MouseService } from "./mouse.service";
import { RotationService } from "./rotation.service";

const MOUSE_SENSITIVITY = 0.002;

@Injectable({
    providedIn: 'root',
})
export class DragDropService {

    constructor(
        private readonly rotationService: RotationService, 
        private readonly mouseService: MouseService) {}

    get rotationChange$(): Observable<number[]> {
        const mousePosition$: Observable<Point2D> = toObservable(this.mouseService.mousePosition);
    
        return fromEvent<MouseEvent>(document, 'mousedown').pipe(
          map(({ clientX, clientY }) => {
            const xRotation = this.rotationService.xRotation();
            const yRotation = this.rotationService.yRotation();
            return [clientX, clientY, xRotation, yRotation];
          }),
          switchMap(([startX, startY, xRotation, yRotation]) => mousePosition$.pipe(
            map(([x, y]) => {
              const deltaX = Math.PI * MOUSE_SENSITIVITY * (y - startY);
              const deltaY = Math.PI * MOUSE_SENSITIVITY * (x - startX);
              return [xRotation + deltaX, yRotation + deltaY];
            }),
            pairwise(),
            filter(([[prevX, prevY], [x, y]]) => x !== prevX || y !== prevY),
            map(([, [x, y]]) => [x, y]),
            takeUntil(fromEvent(document, 'mouseup'))
          )),
        );
      } 

}