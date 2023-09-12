import { computed, Injectable, signal } from "@angular/core";
import { Orientation } from "../types/orientation";

@Injectable({
    providedIn: 'root',
})
export class ViewportService {
    width = signal<number>(window.innerWidth);
    height = signal<number>(window.innerHeight);

    oriantation = computed<Orientation>(() => this.height() < this.width() ? Orientation.HORIZONTAL : Orientation.VERTICAL);

    constructor() {
        window.addEventListener('resize', () => {
            this.width.set(window.innerWidth);
            this.height.set(window.innerHeight);
        })
    }
}