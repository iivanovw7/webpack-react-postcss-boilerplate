/**
 * Module contains Web Vitals config.
 * @module utils/reportWebVitals
 */

import type { ReportHandler } from 'web-vitals/dist/modules/types';

/**
 * Adds performance measurement methods.
 * @see {@link https://create-react-app.dev/docs/measuring-performance/}
 * @param {ReportHandler} onPerfEntry - optional report handler (`console.log`).
 */
export function reportWebVitals(onPerfEntry?: ReportHandler): void {
    if (onPerfEntry) {
        // eslint-disable-next-line
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
}
