/**
 * Module contains application theme switch component.
 * @module ui/components/ThemeSwitch
 */
import type { ReactElement } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dark from '../../../../assets/svg/theme/moon.svg';
import Light from '../../../../assets/svg/theme/sun.svg';
import { DARK_THEME, LIGHT_THEME } from '../../../config/constants';
import env from '../../../utils/env';
import { Portal } from '../../elements/Portal';
import { Switch } from '../../elements/Switch';

import { changeTheme } from './model';
import { makeSelectTheme } from './model/selectors';
import { Container } from './Styled';

const { html } = env;

/**
 * Creates ThemeSwitch component.
 * @method
 *
 * @return {Node} React component with children.
 * @constructor
 */
export function ThemeSwitch(): ReactElement {
    const { theme } = useSelector(makeSelectTheme);
    const dispatch = useDispatch();
    const isDark = theme === DARK_THEME;

    /** Handles theme button click. */
    function handleChange(): void {
        const nextTheme = isDark
            ? LIGHT_THEME
            : DARK_THEME;

        dispatch(changeTheme(nextTheme));
        html.dataset.theme = nextTheme;
    }

    return (
        <Portal id="theme-switch-portal">
            <Container>
                <Switch
                    themeSwitch
                    checked={ isDark }
                    onChange={ handleChange }
                    checkedImg={ Dark }
                    uncheckedImg={ Light }
                />
            </Container>
        </Portal>
    );
}
