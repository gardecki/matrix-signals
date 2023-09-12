export interface SelectorOption<T> {
    text: string;
    value: T;
}

export type SelectorOptions<T = string> = SelectorOption<T>[]; 