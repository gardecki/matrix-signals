export interface Grid<T> {
    columns: number;
    rows: number;
    cells: GridCell<T>[];
}

export interface GridCell<T> {
    columnIndex: number;
    rowIndex: number;
    value: T;
}