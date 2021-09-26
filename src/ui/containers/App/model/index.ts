/**
 * Module contains state slice reducers related to all application.
 * @module ui/containers/App/model
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Contains initial state.
 */
export const initialState = {
    /** Controls top page loading bar. */
    loading: false,
    /** Controls application wait screen. */
    wait: 0,
};

export type TAppState = typeof initialState;

/**
 *  Combines functions of createAction and createReducer of application.
 *
 *  @return {Object}
 *     application state slice with state reduces.
 */
const appSlice = createSlice({
    initialState,
    name: 'state/appSlice',
    reducers: {
        completeWait(state: TAppState): void {
            if (state.wait > 0) {
                state.wait = 0;
            }
        },
        setLoader(state, action: { payload: boolean }): void {
            state.loading = action.payload;
        },
        startWait(state: TAppState): void {
            state.wait++;
        },
        stopWait(state: TAppState): void {
            if (state.wait > 0) {
                state.wait--;
            }
        }
    }
});

export const { startWait, stopWait, completeWait, setLoader } = appSlice.actions;

export default appSlice.reducer;
