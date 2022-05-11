/**
 * Module contains utils related to objects.
 * @module utils/object
 */

import type { AnyObject, WithPromise } from '../types/util';

/* eslint-disable valid-jsdoc */

/**
 * Вызывает метод `then` у объекта `this.promise`, передавая ему указанные аргументы.
 * @param args - arguments.
 * @param {...any} - `then` methods.
 * @return {Promise<unknown>} result
 */
export function onThen<This extends WithPromise<unknown>>(this: This, ...args: Parameters<typeof Promise.prototype.then>): Promise<unknown> {
    return this.promise.then(...args);
}

/**
 * Calls `onCatch` on `this.promise` object method with params.
 * @param args - arguments.
 * @param {...any} - `catch` methods.
 * @return {Promise<unknown>} result
 */
export function onCatch<This extends WithPromise<unknown>>(this: This, ...args: Parameters<typeof Promise.prototype.catch>): Promise<unknown> {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return this.promise.catch(...args);
}

/**
 * Handler containing `onThen` and `onCatch` methods.
 * @typedef {Object} module:utils/object~PromiseHandler
 */
export interface PromiseHandler<T = unknown> extends WithPromise<T> {
    onCatch: typeof onCatch;
    onThen: typeof onThen;
}

/**
 * Adds `catch` and then `handlers` to a target object.
 * @param {object} [target] - target object.
 * @return {module:util/object~PromiseHandler} - changed object or new object.
 */
export function addPromiseHandler<Obj extends object>(target?: Maybe<Obj>): (typeof target) & PromiseHandler {   // eslint-disable-line @typescript-eslint/ban-types
    const result: AnyObject = target || {};

    if (! result.promise) {
        result.promise = Promise.resolve();
    }

    result.onThen = onThen;
    result.onCatch = onCatch;

    return result as Obj & PromiseHandler;
}

/* eslint-enable valid-jsdoc */
