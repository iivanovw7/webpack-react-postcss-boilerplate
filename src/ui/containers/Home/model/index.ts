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
    type: string,
    payload: THomeSearch,
};


export const homeSlice = createSlice({
    name: 'state/homeSlice',
    initialState: initState,
    reducers: {
        setSearchText(state: THomeState, action: PayloadAction<THomeSearch>) {
            state.search = action.payload;
        }
    }
});

export const { setSearchText } = homeSlice.actions;

export default homeSlice.reducer;
