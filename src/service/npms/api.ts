/**
 * Module contains methods for searching npm packages.
 *
 * @module service/npms/api
 */

import { logLevelMap } from '../../log/constants';
import type { RequestResult } from '../BaseService';

import { sendRequest } from './NpmsService';
import type { SearchSuggestion } from './type';
import Logger from '../../log/Logger';

const { ERROR } = logLevelMap;
const logger = Logger.getInstance();

/**
 * Search URL path.
 * @type {string}
 */
const searchPath = 'search';

/**
 * URL request suggestions path.
 * @type {string}
 */
const suggestionsPath = 'suggestions';

/**
 * Fetch search suggestions list.
 * @param {string} [search = ''] - query string.
 *  @see {@link module:service/request~createRequest}
 * @return {SearchSuggestion[]} list of suggestions.
 */
export function requestSuggestions(search = ''): Promise<void | RequestResult<SearchSuggestion[]>> {
    return sendRequest(`${searchPath}/${suggestionsPath}`, { q: search })
        .promise
        .then((result) => result)
        .catch(() => { // eslint-disable-line @typescript-eslint/dot-notation
            logger.send({
                message: 'An error occurred while fetching suggestions.',
                type: ERROR
            });
        });
}

