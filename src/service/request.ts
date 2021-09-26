/**
 * Module contains base request methods.
 * @module service/request
 */
import { propOr } from 'ramda';
import type { Request as SuperagentRequest, Response as SuperagentResponse, ResponseError } from 'superagent';
import request from 'superagent/lib/client';

import config from '../config';
import { httpMethodMap, logLevelMap } from '../config/constants';
import Logger from '../log';
import type { AnyObject } from '../types/util';

import { HttpStatusCodeMap } from './httpStatusCodeMap';

type THeaderSet = Record<string, string>;

interface IRequestData {
    body?: never;
    headerSet: THeaderSet;
    method: string;
    query?: AnyObject;
    timeout?: number;
    url: string;
}

interface ICreateRequestParams {
    headerSet?: THeaderSet;
    method?: string;
    query?: AnyObject;
    timeout?: number;
    url: string;
}

const logger = Logger.getInstance();
const { OK, MULTIPLE_CHOICES } = HttpStatusCodeMap;
const { net: { requestTimeout }} = config;

/**
 * Checks if a network request came back with correct header, if not throws error.
 * @param  {string} url - requested URL.
 * @param  {SuperagentResponse} response - A response from a network request.
 *
 * @return {object|undefined} - Returns response, or throws.
 */
export function checkStatus(url: string, response: SuperagentResponse): SuperagentResponse | void {
    const { status: responseStatus, text } = response;

    if (responseStatus >= OK && responseStatus < MULTIPLE_CHOICES) {
        logger.send({
            message: `Request: ${ url }. \n Received code: ${ responseStatus }.`,
            type: logLevelMap.INFO,
        });

        return response;
    }

    logger.send({
        message: `Error [${ responseStatus }] during network request: \n ${ text }`,
        type: logLevelMap.ERROR,
    });

    throw new Error(text);
}

/**
 * Initiates network request.
 * @param {IRequestData} requestData - Request data set.
 *
 * @return {SuperagentResponse | void} - Returns superagent request.
 */
export function sendRequest(requestData: IRequestData): SuperagentRequest {
    const { method, url, headerSet, timeout, query, body } = requestData;

    return request(method, url)
        .timeout(timeout || requestTimeout)
        .set(headerSet)
        .query(query)
        .send(body)
        .then((res: SuperagentResponse) => checkStatus(url, res))
        .then((res: SuperagentResponse) => {
            return {
                body: res.body,
                headers: res.headers,
                status: res.status,
            };
        })
        .catch((err: ResponseError) => { // eslint-disable-line @typescript-eslint/dot-notation
            logger.send({
                message: `Error [${ String(err.status) }] during network request: ${ err.message }`,
                type: logLevelMap.ERROR,
            });
        }) as SuperagentRequest;
}

/**
 * Prepares base request data.
 * @param {ICreateRequestParams} params - request parameters.
 *
 * @return {function} returns request method.
 */
export function createRequest(params: ICreateRequestParams): SuperagentRequest {
    const withDefaultHeader = propOr({ 'Content-Type': 'application/json' }, 'headerSet') as (ICreateRequestParams) => THeaderSet;
    const requestData = {
        method: httpMethodMap.GET,
        ...params,
        headerSet: withDefaultHeader(params),
    };

    return sendRequest(requestData);
}
