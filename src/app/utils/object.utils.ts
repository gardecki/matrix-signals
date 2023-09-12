import { Object3D } from "../types/object-3d";
import { Point3D } from "../types/point";

export const scale = (object: Object3D, scale = 1): Object3D => ({
    ...object,
    points: object.points.map<Point3D>(([x, y, z])=> [x * scale, y * scale, z * scale]),
});

export const translate = (object: Object3D, [dx, dy, dz]: Point3D): Object3D => ({
    ...object,
    points: object.points.map<Point3D>(([x, y, z])=> [x + dx, y + dy, z + dz]),
});

export const center = (object: Object3D): Object3D => {
    let [minX, minY, minZ] = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    let [maxX, maxY, maxZ] = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

    for(let [x, y, z] of object.points) {
        if (x > maxX) { maxX = x; }
        if (x < minX) { minX = x; }
        if (y > maxY) { maxY = y; }
        if (y < minY) { minY = y; }
        if (z > maxZ) { maxZ = z; }
        if (z < minZ) { minZ = z; }
    }

    const [dx, dy, dz] = [(maxX - minX) / 2, (maxY - minY) / 2, (maxZ - minZ) / 2];
    
    return {
        ...object,
        points: object.points.map<Point3D>(([x, y, z])=> {
            const [sx, sy, sz] = [x - minX, y - minY, z - minZ];
            return [sx - dx, sy - dy, sz - dz];
        }),
    }
};