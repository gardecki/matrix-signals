import { Point2D } from "../types/point";

export const getPath = (points: Point2D[], lines: [number, number][], scale = 1): string => 
    lines.reduce<string>((acc, [a, b]) => {
        const [[ax, ay], [bx, by]] = [points[a], points[b]];
        acc += `M ${ax * scale} ${ay * scale} L ${bx * scale} ${by * scale}`;
        return acc;
    }, '');