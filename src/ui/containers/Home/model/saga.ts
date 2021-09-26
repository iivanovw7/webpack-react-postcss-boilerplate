/**
 * Module contains home page sagas, loads search suggestions.
 *
 * @module containers/Home/model/saga
 */
import type { Pred } from 'ramda';
import { anyPass, both, complement, equals, isEmpty, isNil, pipe, trim, } from 'ramda';
import type { ForkEffect } from 'redux-saga/effects';
import { call, put, takeLatest } from 'redux-saga/effects';

import { requestSuggestions } from '../../../../service/npms/search';
import { isString } from '../../../../utils/helpers';

import type { TSetSearchTextAction } from './index';
import { initialState, setSearchText, setSuggestions } from './index';

const isValid: Pred = pipe(
    trim,
    both(
        isString,
        complement(anyPass([
            isNil,
            isEmpty,
            equals(' '),
        ]))
    )
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function *getSearchSuggestions(action: TSetSearchTextAction) {
    try {
        const { payload } = action;
        const result = isValid(payload)
            ? yield call(requestSuggestions, payload)
            : initialState.suggestions;

        yield put(setSuggestions(result));
    } catch (e: unknown) {
        yield put({ type: 'FETCH_SUGGESTIONS_FAILED' });
    }
}

/**
 * Saga watcher.
 * Takes last API call result.
 * @type {function}
 */
export function *searchSuggestionsData(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(setSearchText, getSearchSuggestions);
}
