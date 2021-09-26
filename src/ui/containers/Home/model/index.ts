/**
 * Module contains state slice and reducers related to Home application.
 * @module ui/containers/Home/model
 */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

/**
 * Contains initial state.
 */
export const initialState = {
    /** Current search value. */
    search: '',
    /** Current search suggestions list. */
    suggestions: [],
};

export type THomeState = typeof initialState;
export type THomeSearch = THomeState['search'];
export type THomeSuggestions = THomeState['suggestions'];
export type TSetSearchTextAction = PayloadAction<THomeSearch>;
export type TSetSuggestionsAction = PayloadAction<THomeSuggestions>;

export const homeSlice = createSlice({
    initialState,
    name: 'state/homeSlice',
    reducers: {
        setSearchText(state: THomeState, action: TSetSearchTextAction) {
            state.search = action.payload;
        },
        setSuggestions(state: THomeState, action: TSetSuggestionsAction) {
            state.suggestions = action.payload;
        }
    }
});

export const { setSearchText, setSuggestions } = homeSlice.actions;

export default homeSlice.reducer;
