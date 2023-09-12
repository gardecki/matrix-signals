import { Injectable, signal } from "@angular/core";
import { INITIALLY_ACTIVE_PROJECTORS } from "../consts/app";
import { ProjectorType } from "../types/projector-type";

@Injectable({
    providedIn: 'root',
})
export class ProjectorsService {
    activeProjectors = signal<ProjectorType[]>(INITIALLY_ACTIVE_PROJECTORS);

    toggle(type: ProjectorType) {
        this.activeProjectors().includes(type) ? 
            this.deselect(type) : this.select(type);
    }

    private deselect(type: ProjectorType) {
        this.activeProjectors.update((projectors) => projectors.filter((proj) => proj !== type));
    }

    private select(type: ProjectorType) {
        this.activeProjectors.update((projectors) => [...projectors, type]);
    }
}