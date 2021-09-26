/**
 * Module contains app container selectors.
 * @module ui/containers/App/model/selectors
 */
import { createSelector } from '@reduxjs/toolkit';
import type { RouterLocation, RouterState } from 'connected-react-router';
import type { LocationState } from 'history';

import type { RootState } from '../../../store/combineReducers';

import type { TAppState } from './index';

/**
 * Selects application state.
 * @param {RootState} state - application root state.
 *
 * @return {TAppState} - object represents application state.
 */
function selectApp(state: RootState): TAppState {
    return state.app;
}

/**
 * Selects application router state.
 * @param {RootState} state - application root state.
 *
 * @return {RouterState} - object represents router state.
 */
function selectRouter(state: RootState): RouterState {
    return state.router;
}

/**
 * Selects application location.
 * @param {RootState} state - application root state.
 *
 * @return {Location} object represents application location.
 */
function selectLocation(state: RootState): RouterLocation<LocationState> {
    return selectRouter(state).location;
}

/**
 * Selects the app state.
 * @method
 *
 * @return {Function} creates new locale selector.
 */
const makeSelectApp = createSelector(selectApp, (appState: TAppState) => {
    return {
        loading: appState.loading,
        wait: appState.wait > 0,
    };
});

export { makeSelectApp, selectLocation };
