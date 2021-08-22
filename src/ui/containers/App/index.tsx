/**
 * Module contains App container.
 * @module ui/containers/App
 */
import { compose } from '@reduxjs/toolkit';
import type { RouterLocation } from 'connected-react-router';
import type { LocationState } from 'history';
import type { Dispatch, ReactElement } from 'react';
import React, { memo, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { logLevelMap } from '../../../config/constants';
import Logger from '../../../log';
import env from '../../../utils/env';
import ThemeSwitch from '../../components/ThemeSwitch';
import { makeSelectTheme } from '../../components/ThemeSwitch/model/selectors';
import Home from '../Home';

import ErrorFallback from './ErrorFallback';
import type { TModifyWait } from './model';
import { completeWait, startWait, stopWait } from './model';
import { makeSelectApp, selectLocation } from './model/selectors';
import { hideWaitScreen, showWaitScreen } from './model/util';

interface IAppProps {
    /** Displays application global loader bar. */
    loading: boolean;
    /** Object represents router `location`. */
    location: RouterLocation<LocationState>;
    /** String represents current application theme. */
    theme: string;
    /** If `true` application main splash screen is displayed, and hidden otherwise. */
    wait: boolean;
    /** Shows application main screen. */
    onStartWait: () => void;
    /** Hides application main screen. */
    onStopWait: () => void;
    /** Shows application main screen. */
    onCompleteWait: () => void;
}

type TMapStateToProps = Pick<IAppProps, 'location' | 'loading' | 'theme' | 'wait'>;

interface IDispatchProps extends Pick<IAppProps, 'onStartWait' | 'onStopWait' | 'onCompleteWait'> {
    /** Dispatches action. */
    dispatch: Dispatch<TModifyWait>;
}

const logger = Logger.getInstance();
const { html } = env;

/**
 * Main application component.
 * Contains router setup and global styles connection.
 * @method
 * @param {IAppProps} props
 *      component pros.
 * @return {ReactElement} React component with children.
 * @constructor
 */
function App(props: IAppProps): ReactElement {
    const { theme, wait } = props;

    useEffect(() => {
        if (wait) {
            showWaitScreen();
        }
        else {
            hideWaitScreen();
        }
    }, [wait]);

    useEffect(() => {
        html.dataset.theme = theme;
    }, []);

    /**
     * App error handler.
     * @param {Error} error - app Error object.
     * @param {string} info - string represents componentStack.
     */
    function handleError(error: Error, info): void {
        logger.send({
            type: logLevelMap.ERROR,
            message: `Application error: ${ error.stack || '' }, componentStack: ${ String(info) }`,
        });
    }

    return (
        <ErrorBoundary FallbackComponent={ ErrorFallback } onError={ handleError }>
            <ThemeSwitch />
            <Switch>
                <Route component={ Home } />
            </Switch>
        </ErrorBoundary>
    );
}

/**
 * Function selects parts of the state required in component.
 * @method
 * @param {Object} state
 *    Object contains application state.
 * @see {@link module:containers/Landing/model/selectors}
 * @return {Function} selector
 */
function mapStateToProps(state): TMapStateToProps {
    const { wait, loading } = makeSelectApp(state);
    const { theme } = makeSelectTheme(state);

    return {
        wait,
        loading,
        location: selectLocation(state),
        theme
    };
}

/**
 * Function mapping dispatch to props.
 * Dispatching action which may cause change of application state.
 * @func mapDispatchToProps
 * @param {Function} dispatch method.
 * @return {Object} redux container
 */
function mapDispatchToProps(dispatch: Dispatch<TModifyWait>): IDispatchProps {
    return {
        onStartWait: () => dispatch(startWait),
        onStopWait: () => dispatch(stopWait),
        onCompleteWait: () => dispatch(completeWait),
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(App);
