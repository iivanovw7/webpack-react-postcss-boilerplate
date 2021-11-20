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

export type ObjectOrNull<T = unknown> = Nullable<AnyObject<T>>;
export type OptionalObject<T = unknown> = Maybe<ObjectOrNull<T>>;

/** Object containing promise. */
export interface WithPromise<T = unknown> {
    promise: Promise<T>;
}
