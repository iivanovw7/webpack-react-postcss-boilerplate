/**
 * Module contains base network service class.
 * @module service/BaseService
 */

import { isFunction } from 'ramda-adjunct';

import config from '../config';
import { logLevelMap } from '../log/constants';
import Logger from '../log/Logger';
import type {
    HeaderSet,
    HttpRequest,
    HttpRequestControl,
    HttpRequestData,
    HttpResponse,
    RequestError,
    UnsuccessfulResponseError
} from '../net';
import { sendRequest } from '../net';
import { httpMethodMap } from '../net/httpMethodMap';

import { errorCodeMap, ErrorData } from './ErrorData';

export type ParseErrorResponse = {
    ok: HttpResponse['ok'];
    text: ResponseParseError['rawResponse']
};

export type RequestData = HttpRequestData;
export type InitialResult = HttpResponse['body'] | HttpResponse['text'] | null;
export type RequestErrorHandler = (result: RequestResult) => void;
export type RequestResultHandler = (result: RequestResult) => void;
export type RequestHandler = (result: RequestResult) => void;

export interface TRequestSettings<Context = unknown> extends Omit<HttpRequest, 'data'> {
    context?: Context;
    errorHandler?: RequestErrorHandler;
    handler?: RequestHandler;
    resultHandler?: RequestResultHandler;
}

export interface RequestResult<InitRes = InitialResult, Res = InitRes, Context = unknown> {
    context?: Context;
    error: ErrorData | null;
    initialResult: InitRes;
    request: BaseRequestControl<InitRes, Res>;
    response: HttpResponse | ParseErrorResponse | null;
    result: Res;
    settings: RequestSettingsValue<Context>;
}

export interface ResponseParseError extends Error {
    original: Error;
    parse: true;
    rawResponse: string | null;
    status: number | null;
    statusCode?: number | null;
}

export type BaseRequestControl<InitRes = InitialResult, Res = InitRes> = HttpRequestControl<RequestResult<InitRes, Res>>;
export type RequestSettingsValue<Context = unknown> = TRequestSettings<Context> | null | undefined;

export type RequestResultAction =
    ((result: RequestResult['result'], requestResult: RequestResult) => unknown)
    | ((result: RequestResult['result']) => unknown);

export type RequestErrorAction =
    ((error: RequestResult['error'], requestResult: RequestResult) => unknown)
    | ((error: RequestResult['error']) => unknown);

export type RequestAction =
    ((result: unknown, requestResult: RequestResult) => unknown)
    | ((result: unknown) => unknown);

const { INVALID_RESULT, CONNECTION_ERROR, REQUEST_TIMEOUT, INVALID_HTTP_STATUS } = errorCodeMap;

const { ERROR } = logLevelMap;
const logger = Logger.getInstance();

/**
 * Base network service class.
 * @class BaseService
 */
export class BaseService {
    /** `Content-Type` data. */
    declare _contentType: string;
    /** Headers data. */
    declare _headerSet: HeaderSet | null;
    /** HTTP-method value. */
    declare _requestMethod: httpMethodMap;
    /** Request timeout. */
    declare _requestTimeout: number;
    /** Base `URL` string. */
    declare _requestUrl: string;
    /** Ending `URL` part. */
    declare _requestUrlEnd: string;
    /** Request result action. */
    declare _requestResultAction: RequestResultAction | null;
    /** Request error action. */
    declare _requestErrorAction: RequestErrorAction | null;

    /**
     * Gets base request `URL`.
     * @return {string} - `URL` string.
     */
    getRequestUrl(): string {
        return this._requestUrl;
    }

    /**
     * Sets request `URL`.
     * @param {string} url -`URL` string.
     * @return {module:service/Base} - context object reference.
     */
    setRequestUrl(url: string): this {
        this._requestUrl = url;

        return this;
    }

    /**
     * Gets request `URL` ending.
     * @return {string} - `URL` ending string.
     */
    getRequestUrlEnd(): string {
        return this._requestUrlEnd;
    }

    /**
     * Sets request `URL` ending part.
     * @param {string} urlEnd -`URL` ending string.
     * @return {module:service/Base} - context object reference.
     */
    setRequestUrlEnd(urlEnd: string): this {
        this._requestUrlEnd = urlEnd;

        return this;
    }

    /**
     * Gets full request `URL` ending.
     * @return {string} - full `URL` string.
     * @see #getRequestUrl
     * @see #getRequestUrlEnd
     */
    getFullRequestUrl(): string {
        return `${ this.getRequestUrl() }/${ this.getRequestUrlEnd() }`;
    }

    /**
     * Gets `HTTP` request method.
     * @return {string} - request `HTTP` method.
     */
    getRequestMethod(): httpMethodMap {
        return this._requestMethod;
    }

    /**
     * Sets `HTTP` request method.
     * @param {string} method - request `HTTP` method.
     * @return {module:service/BaseService} - context object reference.
     */
    setRequestMethod(method: httpMethodMap): this {
        this._requestMethod = method;

        return this;
    }

    /**
     * Gets `Content-Type` string.
     * @return {string} `Content-Type` string.
     */
    getContentType(): string {
        return this._contentType;
    }

    /**
     * Sets `Content-Type` string.
     * @param {string} type - `Content-Type` string.
     * @return {module:service/BaseService} execution context reference.
     */
    setContentType(type: string): this {
        this._contentType = type;

        return this;
    }

    /**
     * Gets header set.
     * @return {Object} - header set.
     */
    getHeaderSet(): HeaderSet | null {
        return this._headerSet;
    }

    /**
     * Sets header set.
     * @param {Object} headerSet - header set.
     * @return {module:service/BaseService} execution context reference.
     */
    setHeaderSet(headerSet: HeaderSet | null): this {
        this._headerSet = headerSet;

        return this;
    }

    /**
     * Gets request timeout.
     * @return {number} request timeout in `ms`.
     */
    getRequestTimeout(): number {
        return this._requestTimeout;
    }

    /**
     * Sets request timeout.
     * @param {number} timeout - request timeout in `ms`.
     * @return {module:service/BaseService} execution context reference.
     */
    setRequestTimeout(timeout: number): this {
        this._requestTimeout = timeout;

        return this;
    }

    /**
     * Form request `URL`.
     * @return {string} request `URL`.
     */
    formRequestUrl(): string {
        return this.getFullRequestUrl();
    }

    /**
     * Gets request result action.
     * @return {Function | null} - request result action.
     */
    getRequestResultAction(): RequestResultAction | null {
        return this._requestResultAction;
    }

    /**
     * Sets request result action.
     * @param {Function | null} action - request result action.
     * @return {module:service/BaseService} - request result action.
     */
    setRequestResultAction(action: RequestResultAction | null): this {
        this._requestResultAction = action;

        return this;
    }

    /**
     * Gets request error action.
     * @return {Function | null} - request error action.
     */
    getRequestErrorAction(): RequestErrorAction | null {
        return this._requestErrorAction;
    }

    /**
     * Sets request error action.
     * @param {Function | null} action - request error action.
     * @return {module:service/BaseService} execution context reference.
     */
    setRequestErrorAction(action: RequestErrorAction | null): this {
        this._requestErrorAction = action;

        return this;
    }

    /**
     * Sets response and error action.
     * @param {Function | null} action - response and error action method.
     * @return {module:service/BaseService} execution context reference.
     */
    setResponseAction(action: RequestAction | null): this {
        return this.setRequestResultAction(action)
            .setRequestErrorAction(action);
    }

    /**
     * Request result handler.
     * @protected
     * @param {module:net/http~HttpResponse} response - response result.
     * @param {module:net/http~BaseRequestControl} request - request data.
     * @param {Object} [settings] - request settings.
     * @return {module:service/Base~RequestResult} processed request result.
     */
    _handleRequestResult(response: HttpResponse, request: BaseRequestControl, settings: RequestSettingsValue): RequestResult {
        let error: ErrorData | HttpResponse['error'] | null = response.error || null;

        if (error) {
            error = new ErrorData(errorCodeMap.INVALID_HTTP_STATUS, null, error);
        }

        const result: RequestResult = {
            error,
            request,
            response,
            result: response.body || response.text,
            settings
        } as RequestResult;

        if ('context' in request) {
            result.context = request.context;
        }

        result.initialResult = result.result;

        const action = this.getRequestResultAction();

        if (isFunction(action)) {
            action(result.result, result);
        }

        return result;
    }

    /**
     * Gets request result in case of error.
     * @param {module:net/http~RequestError} error - error object.
     * @param {module:net/http~BaseRequestControl} request - object represents request.
     * @param {module:service/Base~RequestResult} defaultResult - object represents default result.
     * @return {module:service/Base~RequestResult | null} - returns request result `null` by default.
     */   // @ts-ignore: 'error'/'request'/'defaultResult' is declared but its value is never read.ts(6133)
    getRequestResultFromError(error: RequestError, request: BaseRequestControl, defaultResult: RequestResult): Partial<RequestResult> | null { // eslint-disable-line class-methods-use-this, require-jsdoc
        return null;
    }

    /**
     * Request error handler.
     * @protected
     * @param {module:net~RequestError} error - error object.
     * @param {module:service/Base~BaseRequestControl} request - object represents request.
     * @param {Object} [settings] - request settings.
     * @return {module:service/Base~RequestResult} request result.
     */
    _handleRequestError(error: RequestError, request: BaseRequestControl, settings: RequestSettingsValue): RequestResult {
        let response: RequestResult['response'] = null;

        if ('response' in error) {
            response = error.response;
        }
        else if ('rawResponse' in error) {
            response = {
                ok: false,
                text: error.rawResponse
            };
        }

        let errorData;

        if ('crossDomain' in error) {
            errorData = new ErrorData(CONNECTION_ERROR, null);
        }
        else if ('parse' in error) {
            errorData = new ErrorData(INVALID_RESULT, null, error.original);
        }
        else if (('timeout' in error) || request.isTimedout()) {
            errorData = new ErrorData(REQUEST_TIMEOUT, null);
        }
        else if (response && ! response.ok) {
            errorData = new ErrorData(INVALID_HTTP_STATUS, null, (error as UnsuccessfulResponseError).original);
        }

        let result: RequestResult = {
            error: errorData,
            request,
            response,
            result: null,
            settings
        } as RequestResult;

        if ('context' in request) {
            result.context = request.context;
        }

        result = Object.assign(
            result,
            this.getRequestResultFromError(error, request, result)
        );

        result.initialResult = result.result;

        const action = this.getRequestErrorAction();

        if (isFunction(action)) {
            action(result.error, result);
        }

        logger.send({
            message: `Error code: ${ result.error?.code || 'unknown' }. Error message: ${ error.message }.`,
            type: ERROR
        });

        return result;
    }

    /**
     * Processes request result.
     *
     * @protected
     * @param {module:service/BaseService~RequestResult} result - request result.
     * @param {module:net~BaseRequestControl} request - request data.
     * @return {module:service/BaseService~RequestResult} - precessed request result.
     * @see #sendRequest
     */
    _processRequestResult(result: RequestResult, request: BaseRequestControl): RequestResult { // eslint-disable-line class-methods-use-this
        const { errorHandler, handler, resultHandler } = request;
        const { error } = result;

        if (error && isFunction(errorHandler)) {
            errorHandler(result);
        }
        else if (isFunction(resultHandler)) {
            resultHandler(result);
        }

        if (isFunction(handler)) {
            handler(result);
        }

        return result;
    }

    /**
     * Send request.
     * @memberOf module:service/BaseService
     * @param {object | string} [data] - data to send.
     * @param {Object} [settings] - request settings.
     * @param {string} [settings.contentType=this.getContentType()] - content type {@see {@link #getContentType}}.
     * @param {*} [settings.context] - context {@see {@link module:service/Base~RequestResult}}.
     * @param {Function} [settings.errorHandler] error handler {@see {@link module:service/Base~RequestResult}}.
     * @param {Function} [settings.handler] handler {@see {@link module:service/Base~RequestResult}}.
     * @param {Object} [settings.headerSet=this.getHeaderSet()] request headers set {@see {@link #getHeaderSet}}.
     * @param {string} [settings.method=this.getRequestMethod()] request method {@see {@link #getRequestMethod}}.
     * @param {Function} [settings.resultHandler] result handler {@see {@link module:service/Base~RequestResult}}.
     * @param {number} [settings.timeout=this.getRequestTimeout()] request timeout {@see {@link #getRequestTimeout}}.
     * @param {string} [settings.url=this.getRequestUrl()] get request {@see {@link #getRequestUrl}}.
     * @return {module:net/http~RequestControl} request control {@see {@link module:net/http.sendRequest}}.
     */
    sendRequest<InitRes = InitialResult, Res = InitRes>(data?: RequestData, settings?: RequestSettingsValue): BaseRequestControl<InitRes, Res> {
        const request: HttpRequest = {} as HttpRequest;

        if (data) {
            request.data = data;
        }

        Object.assign(
            request,
            {
                contentType: this.getContentType(),
                headerSet: this.getHeaderSet(),
                method: this.getRequestMethod(),
                timeout: this.getRequestTimeout(),
                url: this.formRequestUrl()
            },
            settings
        );

        if (! request.url) {
            throw new Error('Request URL is not set');
        }

        const requestControl = sendRequest(request);

        // @ts-ignore: Type 'Promise<RequestResult>' is not assignable to type 'Promise<HttpResponse>'. ts(2322)
        requestControl.promise = requestControl.promise
            // @ts-ignore: Argument of type 'IHttpRequestControl<HttpResponse>' is not assignable to parameter of type 'BaseRequestControl'. ts(2345)
            .then((response) => this._handleRequestResult(response, requestControl, settings))
            // @ts-ignore: Argument of type 'IHttpRequestControl<HttpResponse>' is not assignable to parameter of type 'BaseRequestControl'. ts(2345)
            .catch((error) => this._handleRequestError(error, requestControl, settings));   // eslint-disable-line @typescript-eslint/dot-notation

        if (request.errorHandler || request.handler || request.resultHandler) {
            // @ts-ignore: Type 'Promise<RequestResult | HttpResponse>' is not assignable to type 'Promise<HttpResponse>'. ts(2322)
            requestControl.promise = requestControl.promise
                // @ts-ignore: Argument of type 'HttpResponse' is not assignable to parameter of type 'RequestResult'. ts(2345)
                .then((result) => this._processRequestResult(result, requestControl));
        }

        // @ts-ignore Type 'HttpRequestControl<HttpResponse>' is not assignable to type 'BaseRequestControl'. ts(2322)
        return requestControl;
    }
}

BaseService.prototype._contentType = 'application/json';
BaseService.prototype._headerSet = null;
BaseService.prototype._requestMethod = httpMethodMap.get;
BaseService.prototype._requestTimeout = config.net.requestTimeout;
BaseService.prototype._requestUrl = '';
BaseService.prototype._requestUrlEnd = '';
