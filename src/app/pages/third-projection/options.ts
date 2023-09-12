import { getObjectLabel, OBJECTS } from "src/app/consts/objects";
import { getProjectorLabel, PROJECTORS } from "src/app/consts/projectors";
import { SelectorOptions } from "src/app/types/selector-options";
import { ObjectType } from "../../types/object-type";
import { ProjectorType } from "../../types/projector-type";

export const OBJECT_OPTIONS: SelectorOptions<ObjectType> = OBJECTS.map((object) => ({
  value: object,
  text: getObjectLabel(object),
}));
  
export const PROJECTOR_OPTIONS: SelectorOptions<ProjectorType> = PROJECTORS.map((projector) => ({
  value: projector,
  text: getProjectorLabel(projector),
}));
  

  