/**
 * Module contains base request methods.
 * @module service/request
 */
import type { Request as SuperagentRequest, Response as SuperagentResponse } from 'superagent';
import httpClient from 'superagent/lib/client';

import type { AnyObject } from '../types/util';
import type { PromiseHandler } from '../utils/object';
import { addPromiseHandler } from '../utils/object';

import { httpMethodMap } from './httpMethodMap';

export type HeaderSet = AnyObject<string>;

export interface RequestData {
    body?: never;
    headerSet: HeaderSet;
    method: string;
    query?: AnyObject;
    timeout?: number;
    url: string;
}

export interface CreateRequestParams {
    headerSet?: HeaderSet;
    method?: string;
    query?: AnyObject;
    timeout?: number;
    url: string;
}

export interface HttpResponse extends SuperagentResponse {
    /** Headers data. */
    header: HeaderSet;
    /** Request data. */
    req: SuperagentRequest;
    /** HTTP-status */
    statusText: string;
}

export type HttpRequestData = AnyObject | object | string | null | undefined; // eslint-disable-line @typescript-eslint/ban-types

/**
 * @typedef {HttpRequest} module:net~IHttpRequest
 */
export interface HttpRequest<Data extends HttpRequestData = HttpRequestData> {
    [field: string]: unknown;
    contentType?: string;
    data?: Data;
    headerSet?: HeaderSet;
    method?: httpMethodMap;
    timeout?: number;
    url: string;
}

/**
 * @typedef {HttpRequestControl} module:net~IHttpRequestControl
 */
export interface HttpRequestControl<Result = HttpResponse, Data extends HttpRequestData = HttpRequestData> extends HttpRequest<Data>, PromiseHandler<Result> {
    abort: () => void;
    isTimedout: () => boolean;
    method: httpMethodMap;
}

/**
 * @typedef {CrossDomainError} module:net~ICrossDomainError
 */
export interface CrossDomainError extends Error {
    crossDomain: true;
    method: httpMethodMap;
    status: number;
    url: string;
}

/**
 * @typedef {ResponseParseError} module:net~IResponseParseError
 */
export interface ResponseParseError extends Error {
    original: Error;
    parse: true;
    rawResponse: string | null;
    status: number | null;
    statusCode?: number | null;
}

/**
 * @typedef {RequestTimeoutError} module:net~IRequestTimeoutError
 */
export interface RequestTimeoutError extends Error {
    code: 'ECONNABORTED';
    errno: string;
    timedout: boolean;
    timedoutError: Error;
    timeout: number;
}

/**
 * @typedef {UnsuccessfulResponseError} module:net~IUnsuccessfulResponseError
 */
export interface UnsuccessfulResponseError extends Error {
    original: null;
    response: HttpResponse;
    status: HttpResponse['status'];
}

/**
 * @typedef {HttpRequestError} module:net~HttpRequestError
 */
export type HttpRequestError =
    | CrossDomainError
    | ResponseParseError
    | RequestTimeoutError
    | UnsuccessfulResponseError;

/**
 * Aborted request `error` type.
 * @typedef {RequestAbortError} module:net~RequestAbortError
 */
export interface RequestAbortError extends Error {
    code: 'ABORTED';
    method: httpMethodMap;
    /** `HTTP` status. */
    status: number;
    /** Request `URL` */
    url: string;
}

/**
 * Request `error` union type.
 * @typedef {RequestError} module:net~RequestError
 */
export type RequestError = HttpRequestError | RequestAbortError;

const { get, head } = httpMethodMap;

/**
 * Sends http request.
 *
 * @param {Object} request - request description.
 * @param {string} [request.contentType] - content type description.
 * @param {Object | string} [request.data] - request data.
 * @param {Object} [request.headerSet] - header set.
 * @param {string} [request.method=GET] - request method.
 * @param {number} [request.timeout] - request timeout in `ms`.
 * @param {string} request.url - request url string.
 * @return {module:net~IHttpRequestControl} request control instance.
 */
export function sendRequest<Result = HttpResponse, Data extends HttpRequestData = HttpRequestData>(request: HttpRequest<Data>): HttpRequestControl<Result, Data> {
    const requestData = Object.assign({ method: get }, request);
    const { url, data, method, timeout, headerSet: requestHeaderSet, contentType } = requestData;

    if (! url) {
        throw new Error('Request URL (\'url\' field) is not set');
    }

    let headerSet = requestHeaderSet || null;

    if (contentType) {
        (headerSet || (headerSet = {}))['Content-Type'] = contentType;
    }

    const sender = httpClient(method, url);

    if (headerSet) {
        sender.set(headerSet);
    }

    if (timeout) {
        sender.timeout(timeout);
    }

    if (data) {
        if ([get, head].includes(method)) {
            sender.query(data);
        }
        else {
            sender.send(data);
        }
    }

    return addPromiseHandler(
        Object.assign(
            requestData,
            {
                abort(): void {
                    sender.abort();
                },
                isTimedout(): boolean {
                    return sender.timedout as boolean;
                },
                promise: sender.then()
            }
        )
    );
}

