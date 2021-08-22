/**
 * Module contains reducers related to all application.
 * @module ui/containers/App/model
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Contains initial state.
 */
export const initState = {
    /** Controls application wait screen. */
    wait: 0,
    /** Controls top page loading bar. */
    loading: false
};

export type TAppState = typeof initState;
export type TAppWait = TAppState['wait'];
export type TAppLoading = TAppState['loading'];
export type TSetLoader = {
    type: string,
    payload: TAppLoading
};
export type TModifyWait = {
    type: string
};

/**
 *  Combines functions of createAction and createReducer of application.
 *
 *  @return {Object}
 *     application state slice with state reduces.
 */
const appSlice = createSlice({
    name: 'state/appSlice',
    initialState: initState,
    reducers: {
        startWait(state): void {
            state.wait++;
        },
        stopWait(state): void {
            if (state.wait > 0) {
                state.wait--;
            }
        },
        completeWait(state): void {
            if (state.wait > 0) {
                state.wait = 0;
            }
        },
        setLoader(state, action): void {
            state.loading = action.payload;
        }
    }
});

export const { startWait, stopWait, completeWait, setLoader } = appSlice.actions;

export default appSlice.reducer;
