/**
 * Module contains home page container selectors.
 * @module ui/containers/Home/model/selectors
 */

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../../store/combineReducers';

import type { THomeState } from './index';

/**
 * Selects home page state.
 * @param {RootState} state - application root state.
 *
 * @return {THomeState} - object represents application state.
 */
function selectHome(state: RootState): THomeState {
    return state.home;
}

/**
 * Selects the app state.
 * @method
 *
 * @return {Function} creates new locale selector.
 */
const makeSelectHome = createSelector(selectHome, (homeState: THomeState) => {
    return {
        search: homeState.search
    };
});

export { makeSelectHome };
