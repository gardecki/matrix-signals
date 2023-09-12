import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  signal,
  Signal,
} from "@angular/core";
import { ViewportService } from "src/app/services/viewport.service";
import { Orientation } from "src/app/types/orientation";
import { Point2D } from "src/app/types/point";

const SCALE = 0.3;

@Component({
  selector: "g[viewport]",
  templateUrl: "./viewport.component.html",
  styleUrls: ["./viewport.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewportComponent {
  private viewport = inject(ViewportService);

  private _columns = signal<number>(1);
  private _rows = signal<number>(1);

  @Input() title: string = null;
  @Input() label: string = null;

  @Input() rowIndex = 0;
  @Input() columnIndex = 0;

  @Input() set columns(columns: number) {
    this._columns.set(columns);
  }
  @Input() set rows(rows: number) {
    this._rows.set(rows);
  }

  @Input() points: Point2D[] = [];
  @Input() lines: [number, number][] = [];

  @Input() showPoints: boolean = false;

  width: Signal<number> = computed(
    () =>
      (this.isHorizontal() ? this.viewport.width() : this.viewport.height()) /
      this._columns()
  );
  height: Signal<number> = computed(
    () =>
      (this.isHorizontal() ? this.viewport.height() : this.viewport.width()) /
      this._rows()
  );

  topLeft: Signal<Point2D> = computed(() => {
    if (this.isHorizontal()) {
      return [this.width() * this.columnIndex, this.height() * this.rowIndex];
    }
    return [this.height() * this.rowIndex, this.width() * this.columnIndex];
  });

  center: Signal<Point2D> = computed(() => {
    const [x, y] = this.topLeft();
    const [width, height] = this.isHorizontal()
      ? [this.width(), this.height()]
      : [this.height(), this.width()];

    return [x + width / 2, y + height / 2];
  });

  scale: Signal<number> = computed(
    () => SCALE * Math.min(this.width(), this.height())
  );

  isHorizontal(): boolean {
    return this.viewport.oriantation() === Orientation.HORIZONTAL;
  }

  trackByIndex(index: number) {
    return index;
  }
}
