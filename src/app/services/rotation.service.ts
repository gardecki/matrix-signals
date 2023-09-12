import { computed, Injectable, signal, Signal } from "@angular/core";
import { RotateFn } from "../types/rotate-fn";

@Injectable({
    providedIn: 'root',
})
export class RotationService {
    xRotation = signal(0);
    yRotation = signal(0);
    rotate: Signal<RotateFn>;

    constructor() {
        this.rotate = computed(() => {
            const [xRot, yRot] = [this.xRotation(), this.yRotation()];
            const [sinX, cosX] = [Math.sin(xRot), Math.cos(xRot)];
            const [sinY, cosY] = [Math.sin(yRot), Math.cos(yRot)];
            return ([x, y, z]) => {
                const [xRotY, yRotY, zRotY] = [
                    x * cosY + z * sinY,
                    y,
                    -x * sinY + z * cosY,
                ];
                return [
                    xRotY, 
                    yRotY * cosX - zRotY * sinX,
                    yRotY * sinX + zRotY * cosX  
                ]
            }})
    }
}