import type { ForkEffect, AllEffect } from 'redux-saga/effects';
import { all, fork } from 'redux-saga/effects';
import type { SagaGenerator } from 'typed-redux-saga';

import { searchSuggestionsData } from '../containers/Home/model/saga';

/**
 * Merging sagas.
 */
export default function *watchAll(): Generator<AllEffect<ForkEffect<Generator<SagaGenerator<never, ForkEffect<never>>, void, unknown>>>, void, unknown> {
    yield all([
        fork(searchSuggestionsData),
    ]);
}

