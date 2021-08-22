/**
 * Module contains date related functions.
 * @module utils/date
 */

/**
 * Converts timestamp in formatted date, returns string representation of current date.
 * @param {Date} timestamp - using "new Date()" by default.
 * @return {string} returns formatted date.
 */
export function formatLoggerDate(timestamp: Date = new Date()): string {
    const date = {
        dd: timestamp.getDate(),
        mm: timestamp.getMonth() + 1,
        ss: timestamp.getSeconds(),
    };

    if (date.dd < 10) {
        date.dd = Number(`0${ date.dd }`);
    }

    if (date.mm < 10) {
        date.mm = Number(`0${ date.mm }`);
    }

    if (date.ss < 10) {
        date.ss = Number(`0${ date.ss }`);
    }

    return `[${ date.dd }/${ date.mm }/${ timestamp.getFullYear() }][${ timestamp.getHours() }:${ timestamp.getMinutes() }:${ date.ss }]`;
}
