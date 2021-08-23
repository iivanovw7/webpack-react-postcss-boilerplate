/**
 * Module contains App container.
 * @module ui/containers/App
 */
import type { ReactElement } from 'react';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { logLevelMap } from '../../../config/constants';
import Logger from '../../../log';
import env from '../../../utils/env';
import ThemeSwitch from '../../components/ThemeSwitch';
import { makeSelectTheme } from '../../components/ThemeSwitch/model/selectors';
import { Home } from '../Home';

import ErrorFallback from './ErrorFallback';
import { makeSelectApp } from './model/selectors';
import { setGlobalLoader, setWaitScreen } from './model/util';

const logger = Logger.getInstance();
const { html } = env;

/**
 * Main application component.
 * Contains router setup and global styles connection.
 * @constructor

 * @return {ReactElement} React component with children.
 */
export function App(): ReactElement {
    const { wait, loading } = useSelector(makeSelectApp);
    const { theme } = useSelector(makeSelectTheme);

    useEffect(() => {
        setWaitScreen(wait);
        setGlobalLoader(loading);
    }, [loading, wait]);

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

