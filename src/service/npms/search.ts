/**
 * Module contains methods for searching npm packages.
 *
 * @module service/npms/search
 */

import type { Request as SuperagentRequest } from 'superagent';

import config from '../../config';
import { createRequest } from '../request';

const { net: { npmApiUrl }} = config;

/**
 * URL request action path
 * @type {string}
 */
const basePath = 'search';

/**
 * URL request suggestions path;
 * @type {string}
 */
const suggestionsPath = 'suggestions';

/**
 * Fetch search suggestions list.
 * @param {string} [search = ''] - query string.
 * @return {SuperagentRequest} request method.
 *  @see {@link module:service/request~createRequest}
 */
export function requestSuggestions(search = ''): SuperagentRequest {
    return createRequest({
        query: {
            q: search
        },
        timeout: 500,
        url: `${npmApiUrl}/${basePath}/${suggestionsPath}`,
    });
}
