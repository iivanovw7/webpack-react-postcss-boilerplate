/**
 * Module contains global application types.
 * @module types/global
 */
import type * as H from 'history';

import type { RunningMode } from '../config';

declare global {
    /**
     * Defines current running mode.
     * @type {string}
     */
    const CONFIG: RunningMode;

    // eslint-disable-next-line @typescript-eslint/ban-types
    type JSX = {};

    namespace JSX {}

    interface Location extends H.Location {
        path: string;
    }

    /** Represents type of optional object. */
    type Maybe<T> = T | undefined | null;

    /** Represents type of `nullable` object. */
    type Nullable<T> = T | null;

    type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer Data> ? Data : never;
}
