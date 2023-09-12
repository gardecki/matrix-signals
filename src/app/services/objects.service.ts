import { Injectable, signal } from "@angular/core";
import { INITIALLY_ACTIVE_OBJECTS } from "../consts/app";
import { ObjectType } from "../types/object-type";

@Injectable({
    providedIn: 'root',
})
export class ObjectsService {
    activeObjects = signal<ObjectType[]>(INITIALLY_ACTIVE_OBJECTS);

    toggle(type: ObjectType) {
        this.activeObjects().includes(type) ? 
            this.deselect(type) : this.select(type);
    }

    private deselect(type: ObjectType) {
        this.activeObjects.update((projectors) => projectors.filter((proj) => proj !== type));
    }

    private select(type: ObjectType) {
        this.activeObjects.update((projectors) => [...projectors, type]);
    }
}