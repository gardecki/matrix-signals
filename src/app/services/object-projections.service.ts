import { computed, inject, Injectable, Signal } from "@angular/core";
import { getObject, OBJECTS } from "../consts/objects";
import { getProjectFn, PROJECTORS } from "../consts/projectors";
import { ObjectType } from "../types/object-type";
import { ProjectorType } from "../types/projector-type";
import { Point2D, Point3D } from "../types/point";
import { RotationService } from "./rotation.service";

export interface ObjectProjection {
    object: ObjectType;
    projector: ProjectorType;
    rotated: Signal<Point3D[]>;
    projected: Signal<Point2D[]>;
}

type ObjectRotationsMap = Map<ObjectType, Signal<Point3D[]>>
type ObjectProjectionsMap = Map<ProjectorType, Map<ObjectType, Signal<Point2D[]>>>

@Injectable({
    providedIn: 'root',
})
export class ObjectProjectionsService {
    private rotation = inject(RotationService);

    private rotationsMap: ObjectRotationsMap = this.getRotationsMap();
    private projectionsMap: ObjectProjectionsMap = this.getProjectionsMap();

    getRotation(object: ObjectType): Signal<Point3D[]> {
        return this.rotationsMap.get(object);
    }

    getProjection(object: ObjectType, projector: ProjectorType): Signal<Point2D[]> {
        return this.projectionsMap.get(projector).get(object);
    }

    private getRotationsMap(): ObjectRotationsMap {
        return new Map(OBJECTS.map((type) => {
            const object = getObject(type)
            return [type, computed(() => object.points.map(this.rotation.rotate()))];
        }));
    }

    private getProjectionsMap(): ObjectProjectionsMap {
        return new Map(PROJECTORS.map((projectorType) => {
            const project = getProjectFn(projectorType);
            return [
                projectorType, 
                new Map(OBJECTS.map((objectType) =>
                    [objectType, computed(() => this.getRotation(objectType)().map(project))])
                )
            ];
        }));
    }

}