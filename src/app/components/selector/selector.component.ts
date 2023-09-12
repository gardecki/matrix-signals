import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { SelectorOptions } from "src/app/types/selector-options";

@Component({
  selector: "ms-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorComponent<T = string> {
  @Input() options: SelectorOptions<T> = [];
  @Input() activeOptions: T[] = [];
  @Output() optionClick: EventEmitter<T> = new EventEmitter();

  isActive(value: T): boolean {
    return this.activeOptions.includes(value);
  }
}
