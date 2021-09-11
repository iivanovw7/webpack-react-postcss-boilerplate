/**
 * Module contains state slice and reducers related to Home application.
 * @module ui/containers/Home/model
 */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

/**
 * Contains initial state.
 */
export const initState = {
    /** Current search value. */
    search: '',
};

export type THomeState = typeof initState;
export type THomeSearch = THomeState['search'];
export type TModifySearchText = {
    payload: THomeSearch,
    type: string,
};


export const homeSlice = createSlice({
    initialState: initState,
    name: 'state/homeSlice',
    reducers: {
        setSearchText(state: THomeState, action: PayloadAction<THomeSearch>) {
            state.search = action.payload;
        }
    }
});

export const { setSearchText } = homeSlice.actions;

export default homeSlice.reducer;
