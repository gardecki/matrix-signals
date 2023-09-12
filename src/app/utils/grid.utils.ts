import { objectSort } from "../consts/objects";
import { Grid } from "../types/grid";
import { ObjectType } from "../types/object-type";
import { ProjectorType } from "../types/projector-type";

export interface ViewportCell {
    object: ObjectType;
    projector: ProjectorType;
}

const EMPTY_GRID: Grid<ViewportCell> = {
    columns: 0,
    rows: 0,
    cells: [],
};

export const getGrid = (objects: ObjectType[], projectors: ProjectorType[]): Grid<ViewportCell> => {
    if (!objects.length || !projectors.length) {
        return EMPTY_GRID;
    }

    const sortedObjects = objects.sort(objectSort);
    const sortedProjectors = projectors.sort();

    // SINGLE PROJECTOR
    if (sortedProjectors.length === 1) {
        switch (sortedObjects.length) {
            case 1:
            case 2:
            case 3: {
                return {
                    columns: sortedObjects.length,
                    rows: 1,
                    cells: sortedObjects.map((object, index) => ({
                        columnIndex: index,
                        rowIndex: 0,
                        value: {
                            object,
                            projector: sortedProjectors[0],
                        }
                    })),
                }
            }
            case 4: {
                return {
                    columns: 2,
                    rows: 2,
                    cells: sortedObjects.map((object, index) => ({
                        columnIndex: index % 2,
                        rowIndex: Math.floor(index / 2),
                        value: {
                            object,
                            projector: sortedProjectors[0],
                        }
                    })),
                }
            }
        }
    }

    // TWO PROJECTORS
    if (objects.length === 1) {
        return {
            columns: 2,
            rows: 1,
            cells: sortedProjectors.map((projector, index) => ({
                columnIndex: index % 2,
                rowIndex: Math.floor(index / 2),
                value: {
                    object: objects[0],
                    projector,
                }
            })),
        }
    }


    const cells = sortedObjects.reduce((acc, curr, columnIndex) => {
        acc.push(...sortedProjectors.map((p, rowIndex) => ({
            columnIndex,
            rowIndex,
            value: {
                object: sortedObjects[columnIndex],
                projector: sortedProjectors[rowIndex],
            }
        })));
        return acc;
    }, [])

    return {
        columns: sortedObjects.length,
        rows: sortedProjectors.length,
        cells,
    }
}