/**
 * Module contains helper functions.
 * @module utils/helpers
 */
import { is } from 'ramda';

/**
 * Checks if input value is `String`
 * @func isString
 * @return {Boolean}
 * @example
 *  isString(String, 'foo') //=> true
 *  isString(String, {a: 'foo'}) //=> false
 */
export const isString = is(String);
