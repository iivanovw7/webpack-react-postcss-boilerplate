/**
 * Module contains Web Vitals config.
 * @module utils/reportWebVitals
 */

export const reportWebVitals = (onPerfEntry?): void => { // eslint-disable-line
    if (onPerfEntry && onPerfEntry instanceof Function) {
        // eslint-disable-next-line
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};
