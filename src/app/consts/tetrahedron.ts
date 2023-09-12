import { Object3D } from "../types/object-3d";

export const TETRAHEDRON: Object3D = {
    /*     
        (±1, 0, -1/√2)
        (0, ±1 1/√2)
    */    
    points: [
        // [1, 0, -1 / Math.sqrt(2)],
        // [-1, 0, -1 / Math.sqrt(2)],
        // [0, 1, 1 / Math.sqrt(2)],
        // [0, -1, 1 / Math.sqrt(2)],
        [0, 0, 1],
        [0, Math.sqrt(2), 0],
        [-Math.sqrt(3)/2, 0, -1/2],
        [Math.sqrt(3)/2, 0, -1/2],
    ],    
    
    lines: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 3],
        [2, 3],
    ],
}