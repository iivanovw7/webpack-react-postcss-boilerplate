/**
 * Module contains home page container selectors.
 * @module ui/containers/Home/model/selectors
 */

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store/combineReducers';

import type { HomeState } from './index';

/**
 * Selects home page state.
 * @param {RootState} state - application root state.
 * @return {HomeState} - object represents application state.
 */
function selectHome(state: RootState): HomeState {
    return state.home;
}

/**
 * Selects the app state.
 * @method
 * @return {Function} creates new locale selector.
 */
const makeSelectHome = createSelector(selectHome, ({ search, suggestions }: HomeState) => {
    return {
        search,
        suggestions
    };
});

export { makeSelectHome };
