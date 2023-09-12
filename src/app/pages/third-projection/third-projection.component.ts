import { Component, computed, HostListener, inject, Signal } from '@angular/core';
import { ObjectsService } from '../../services/objects.service';
import { ProjectorsService } from '../../services/projectors.service';
import { ProjectorType } from '../../types/projector-type';
import { SelectorOptions } from '../../types/selector-options';
import { OBJECT_OPTIONS, PROJECTOR_OPTIONS } from './options';
import { ObjectType } from '../../types/object-type';
import { getGrid, ViewportCell } from '../../utils/grid.utils';
import { Grid } from '../../types/grid';
import { Point2D } from '../../types/point';
import { RotationService } from '../../services/rotation.service';
import { DragDropService } from '../../services/drag-drop.service';
import { ObjectProjectionsService } from '../../services/object-projections.service';
import { getObject } from '../../consts/objects';

@Component({
  templateUrl: './third-projection.component.html',
  styleUrls: ['./third-projection.component.scss']
})
export class ThirdProjectionComponent {
  private objects = inject(ObjectsService);
  private projectors = inject(ProjectorsService);
  private rotation = inject(RotationService);
  private dragDrop = inject(DragDropService);
  private objectProjections = inject(ObjectProjectionsService);
  
  activeObjects: Signal<ObjectType[]> = this.objects.activeObjects;
  activeProjectors: Signal<ProjectorType[]> = this.projectors.activeProjectors;
  
  objectOptions: SelectorOptions<ObjectType> = OBJECT_OPTIONS;
  projectorOptions: SelectorOptions<ProjectorType> = PROJECTOR_OPTIONS;

  showPoints: boolean = true;

  grid = computed<Grid<ViewportCell>>(() => getGrid(this.activeObjects(), this.activeProjectors()));

  constructor() {
    this.dragDrop.rotationChange$.subscribe(([x, y]) => {
      this.rotation.xRotation.set(x);
      this.rotation.yRotation.set(y);
    });
  }

  toggleObject(type: string) {
    this.objects.toggle(type as ObjectType);
  }

  toggleProjector(type: string) {
    this.projectors.toggle(type as ProjectorType);
  }

  getPoints(type: ObjectType, projector: ProjectorType): Signal<Point2D[]> {
    return this.objectProjections.getProjection(type, projector);
  }

  getLines(type: ObjectType): [number, number][] {
    return getObject(type).lines;
  }

  @HostListener('window:keypress', ['$event'])
  private onKeypress(event: KeyboardEvent) {
    if (event.key === 'p') {
      this.showPoints = !this.showPoints;
    }
  }

  @HostListener('dblclick')
  private onDoubleClick() {
    this.rotation.xRotation.set(0);
    this.rotation.yRotation.set(0);
  }
}
