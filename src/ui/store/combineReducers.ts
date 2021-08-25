/**
 * Module used to create combine reducers.
 * @module ui/store/combineReducers.
 */
import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import themeReducer from '../components/ThemeSwitch/model';
import appReducer from '../containers/App/model';
import homeReducer from '../containers/Home/model';
import appHistory from '../routes/history';

/**
 * Merging reducers.
 * @return {function} createReducer - returns function used for store combining.
 */
export default function createReducer() { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    return combineReducers({
        app: appReducer,
        home: homeReducer,
        // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14537
        router: connectRouter(appHistory),
        theme: themeReducer
    });
}

export type RootState = ReturnType<ReturnType<typeof createReducer>>;
