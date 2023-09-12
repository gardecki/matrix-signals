import { Injectable, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { fromEvent, map } from "rxjs";
import { Point2D } from "../types/point";

@Injectable({
  providedIn: "root",
})
export class MouseService {
  mousePosition: Signal<Point2D>;

  constructor() {
    const mousePosition$ = fromEvent<MouseEvent>(document, "mousemove").pipe(
      map(({ clientX, clientY }): Point2D => [clientX, clientY])
    );
    this.mousePosition = toSignal(mousePosition$, { initialValue: [0, 0] });
  }
}

