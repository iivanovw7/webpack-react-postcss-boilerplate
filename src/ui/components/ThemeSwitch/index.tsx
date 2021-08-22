/**
 * Module contains application theme switch component.
 * @module ui/components/ThemeSwitch
 */
import { compose } from '@reduxjs/toolkit';
import type { Dispatch, ReactElement } from 'react';
import React, { memo } from 'react';
import { connect } from 'react-redux';

import Dark from '../../../../assets/svg/theme/moon.svg';
import Light from '../../../../assets/svg/theme/sun.svg';
import { DARK_THEME, LIGHT_THEME } from '../../../config/constants';
import env from '../../../utils/env';
import { Portal } from '../../elements/Portal';
import { Switch } from '../../elements/Switch';

import type { ChangeTheme, Theme, ThemeProviderState } from './model';
import { changeTheme } from './model';
import { makeSelectTheme } from './model/selectors';
import { Container } from './Styled';

interface IThemeSwitchProps {
    /** Theme change handler. */
    onThemeChange: (theme: Theme) => void;
    /** String represents current application theme. */
    theme: string;
}

interface IDispatchProps extends Pick<IThemeSwitchProps, 'onThemeChange'> {
    /** Dispatches action. */
    dispatch: Dispatch<ChangeTheme>;
}

const { html } = env;

/**
 * Creates ThemeSwitch component.
 * @method
 *
 * @param {IDispatchProps} props
 *  contains component props
 *
 * @return {Node} React component with children.
 * @constructor
 */
function ThemeSwitch(props: IThemeSwitchProps): ReactElement {
    const { theme, onThemeChange } = props;
    const isDark = theme === DARK_THEME;

    /** Handles theme button click. */
    function handleChange(): void {
        const nextTheme = isDark
            ? LIGHT_THEME
            : DARK_THEME;

        onThemeChange(nextTheme);
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

/**
 * Function selects parts of the state required in component.
 * @func mapStateToProps
 * @param {Object} state
 *    Object contains application state.
 * @see {@link module:ui/containers/ThemeSwitch/model/selectors}
 *
 * @return {Function} selector.
 */
function mapStateToProps(state): ThemeProviderState {
    const { theme } = makeSelectTheme(state);

    return {
        theme
    };
}

/**
 * Function mapping dispatch to props.
 * Dispatching action which may cause change of application state.
 * @func mapDispatchToProps
 * @param {Function} dispatch method.
 *
 * @return {Object} redux container.
 */
function mapDispatchToProps(dispatch: Dispatch<ChangeTheme>): IDispatchProps {
    return {
        onThemeChange: (theme: Theme) => dispatch(changeTheme(theme)),
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThemeSwitch);
export { ThemeSwitch as OriginalThemeSwitch };
