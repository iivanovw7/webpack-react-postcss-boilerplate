/**
 * Module contains home page sagas, loads search suggestions.
 *
 * @module containers/Home/model/saga
 */
import type { Arity1Fn, Pred } from 'ramda';
import {
    always,
    anyPass,
    both,
    complement,
    defaultTo,
    equals,
    ifElse,
    isEmpty,
    isNil,
    pipe,
    prop,
    trim
} from 'ramda';
import { isString } from 'ramda-adjunct';
import type { CallEffect, ForkEffect } from 'redux-saga/effects';
import { call, takeLatest } from 'typed-redux-saga';
import type { SagaGenerator } from 'typed-redux-saga/types';

import type { RequestResult } from '../../../../service/BaseService';
import { requestSuggestions } from '../../../../service/npms/api';
import type { SearchSuggestion } from '../../../../service/npms/type';

import type { SetSearchTextAction } from './index';
import { initialState, setSearchText, setSuggestions } from './index';

const getSuggestions: Arity1Fn = ifElse(
    isNil,
    always(initialState.suggestions),
    pipe(prop('result'), defaultTo(initialState.suggestions))
);

const isSearchInputValid: Pred = pipe(
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

/**
 * Fetches search suggestions.
 * @param {Object.<{payload: string, type: string}>} action - search text action.
 * @type {function}
 */
export function *getSearchSuggestions(action: SetSearchTextAction): Generator<CallEffect<void | RequestResult<SearchSuggestion[], SearchSuggestion[], unknown>>, void, unknown> {
    const { payload: searchTerm } = action;

    if (isSearchInputValid(searchTerm)) {
        setSuggestions(getSuggestions(yield *call(requestSuggestions, searchTerm)));
    }
}

/**
 * Saga watcher.
 * Takes last API call result.
 * @type {function}
 */
export function *searchSuggestionsData(): Generator<SagaGenerator<never, ForkEffect<never>>, void, unknown> {
    yield takeLatest(setSearchText, getSearchSuggestions);
}
