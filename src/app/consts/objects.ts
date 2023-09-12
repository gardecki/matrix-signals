
import { Object3D } from "../types/object-3d";
import { ObjectType } from "../types/object-type";
import { center, scale, translate } from "../utils/object.utils";
import { CUBE } from "./cube";
import { DODECAHEDRON } from "./dodecahedron";
import { ICOSAHEDRON } from "./icosahedron";
import { OCTAHEDRON } from "./octahedron";
import { TETRAHEDRON } from "./tetrahedron";
import { TETROMINO } from "./tetromino";

interface Object3DData {
    object: Object3D;
    label: string;
}

const OBJECTS_MAP: Map<ObjectType, Object3DData> = new Map([
    [ObjectType.TETRAHEDRON, {
        object: scale(translate(TETRAHEDRON, [0, -Math.sqrt(2) / 3, 0]), 1.5),
        label: '4',
    }],
    [ObjectType.CUBE, {
        object: CUBE,
        label: '6',
    }],
    [ObjectType.TETROMINO, {
        object: center(TETROMINO),
        label: 'T',
    }],
    [ObjectType.OCTAHEDRON, {
        object: scale(OCTAHEDRON, 1.5),
        label: '8',
    }],
    [ObjectType.DODECAHEDRON, {
        object: scale(DODECAHEDRON, 0.8),
        label: '12',
    }],
    [ObjectType.ICOSAHEDRON, {
        object: scale(ICOSAHEDRON, 0.8),
        label: '20',
    }],
])

export const OBJECTS: ObjectType[] = Array.from(OBJECTS_MAP.keys());

export const getObjectData = (type: ObjectType): Object3DData => OBJECTS_MAP.get(type);
export const getObject = (type: ObjectType): Object3D => getObjectData(type).object;
export const getObjectLabel = (type: ObjectType): string => getObjectData(type).label;
export const objectSort = (a: ObjectType, b: ObjectType): number => OBJECTS.indexOf(a) - OBJECTS.indexOf(b);