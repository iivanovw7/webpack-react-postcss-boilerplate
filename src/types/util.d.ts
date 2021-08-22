/**
 * Module contains common additional utility types.
 * @module types/util
 */

/** Gets property type. */
export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

/** Represents type of any object. */
export interface AnyObject<T = unknown> {
    [field: string]: T;
}

/** Represents type of object with partial and `nullable` fields. */
export type PartialAndNullable<T> = {
    [P in keyof T]?: T[P] | null;
};
