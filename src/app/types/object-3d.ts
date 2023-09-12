import { Point3D } from "./point";

export interface Object3D {
    points: Point3D[];
    lines: [number, number][];
}