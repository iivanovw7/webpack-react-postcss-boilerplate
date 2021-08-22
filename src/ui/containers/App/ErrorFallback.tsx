/**
 * Module contains Error message.
 * @module ui/containers/App/ErrorFallback
 */
import type { ReactElement } from 'react';
import React, { memo } from 'react';

/**
 * Reloads browser page
 * @param {SyntheticEvent | Event} eventData
 *  event data
 */
function handleReloadClick(eventData): void {
    eventData.preventDefault();
    eventData.stopPropagation();
    location.reload();
}

/**
 * App error fallback message.
 * @method
 * @return {ReactElement} React component with children.
 * @constructor
 */
function ErrorFallback(): ReactElement {
    return (
        <div>
            <p>Error</p>
            <a href="/" target="_self" onClick={ handleReloadClick }>
                Reload
            </a>
        </div>
    );
}

export default memo(ErrorFallback);
