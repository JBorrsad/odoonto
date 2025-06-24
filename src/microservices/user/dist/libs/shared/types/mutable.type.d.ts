export type Mutable<T> = {
    -readonly [key in keyof T]: T[key];
};
export type DeepMutable<T> = {
    -readonly [P in keyof T]: DeepMutable<T[P]>;
};
