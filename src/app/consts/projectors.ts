import { ProjectFn } from "../types/project-fn";
import { ProjectorType } from "../types/projector-type";
import { Point3D } from "../types/point";


/**
 * Orthogonal projection on XY plane
 */
const ORTHOGONAL_SCALE = 0.8;
export const projectOrthogonal: ProjectFn = ([x, y]) => [x, -y ];

/**
 * Perspective projection
 * VZ = viewport distance from the origin (along Z axis) 
 */
 const PERSPECTIVE_SCALE = 0.35;


const VZ = 5;

export const projectPerspective: ProjectFn = ([x, y, z]) => [
    (2 * VZ * x / (VZ - z)), 
    (2 * VZ * -y / (VZ - z)), 
];

/**
 * Projectors map
 */
export const PROJECTORS: ProjectorType[] = [
    ProjectorType.ORTHOGONAL,
    ProjectorType.PERSPECTIVE,
]

export const PROJECTORS_MAP: Record<ProjectorType, ProjectFn> = {
    [ProjectorType.ORTHOGONAL]: projectOrthogonal,
    [ProjectorType.PERSPECTIVE]: projectPerspective
};  

export const PROJECTORS_SCALES_MAP: Record<ProjectorType, number> = {
    [ProjectorType.ORTHOGONAL]: ORTHOGONAL_SCALE,
    [ProjectorType.PERSPECTIVE]: PERSPECTIVE_SCALE,
};

export const PROJECTORS_LABELS_MAP: Record<ProjectorType, string> = {
    [ProjectorType.ORTHOGONAL]: 'O',
    [ProjectorType.PERSPECTIVE]: 'P',
};  

export const getProjector = (type: ProjectorType): ProjectFn => PROJECTORS_MAP[type];
export const getProjectorLabel = (type: ProjectorType): string => PROJECTORS_LABELS_MAP[type];
export const getProjectorScale= (type: ProjectorType): number => PROJECTORS_SCALES_MAP[type];
export const getProjectFn= (type: ProjectorType): ProjectFn => {
    const [project, scale] = [getProjector(type), getProjectorScale(type)];
    return (point: Point3D) => {
        const [x, y] = project(point);
        return [x * scale, y * scale];
    };
}
export const projectorSort = (a: ProjectorType, b: ProjectorType): number => PROJECTORS.indexOf(a) - PROJECTORS.indexOf(b);