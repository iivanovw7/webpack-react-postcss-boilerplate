/**
 * Module contains reducers related to theme switch.
 * @module ui/components/ThemeSwitch/model
 */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { DARK_THEME, LIGHT_THEME } from '../../../../config/constants';
import env from '../../../../utils/env';

/**
 * Theme reducer initialState.
 */
export const initState = {
    theme: env.isDarkTheme
        ? DARK_THEME
        : LIGHT_THEME,
};

export type ThemeProviderState = typeof initState;
export type Theme = ThemeProviderState['theme'];

/**
 *  Combines functions of createAction and createReducer of application.
 *  @return {Object}
 *     application state slice with state reduces.
 */
const themeProvider = createSlice({
    initialState: initState,
    name: 'pw/themeProvider',
    reducers: {
        changeTheme(state, action: PayloadAction<Theme>): void {
            state.theme = action.payload;
        },
    },
});

export const { changeTheme } = themeProvider.actions;

export default themeProvider.reducer;
