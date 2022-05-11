/**
 * Module contains state slice and reducers related to Home application.
 * @module ui/containers/Home/model
 */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { SearchSuggestion } from '../../../../service/npms/type';

export type HomeState = {
    search: string;
    suggestions: Array<SearchSuggestion>;
};

export type HomeSearch = HomeState['search'];
export type HomeSuggestions = HomeState['suggestions'];
export type SetSearchTextAction = PayloadAction<HomeSearch>;
export type SetSuggestionsAction = PayloadAction<HomeSuggestions>;

/**
 * Contains initial state.
 */
export const initialState = {
    /** Current search value. */
    search: '',
    /** Current search suggestions list. */
    suggestions: [],
};

export const homeSlice = createSlice({
    initialState,
    name: 'state/homeSlice',
    reducers: {
        setSearchText(state: HomeState, action: SetSearchTextAction) {
            state.search = action.payload;
        },
        setSuggestions(state: HomeState, action: SetSuggestionsAction) {
            state.suggestions = action.payload;
        }
    }
});

export const { setSearchText, setSuggestions } = homeSlice.actions;

export default homeSlice.reducer;
