/**
 * Module contains state slice reducers related to all application.
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
        startWait(state: TAppState): void {
            state.wait++;
        },
        stopWait(state: TAppState): void {
            if (state.wait > 0) {
                state.wait--;
            }
        },
        completeWait(state: TAppState): void {
            if (state.wait > 0) {
                state.wait = 0;
            }
        },
        setLoader(state, action: { payload: boolean }): void {
            state.loading = action.payload;
        }
    }
});

export const { startWait, stopWait, completeWait, setLoader } = appSlice.actions;

export default appSlice.reducer;
