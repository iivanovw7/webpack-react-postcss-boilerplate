/**
 * Module contains base npms service.
 * @module service/npms/NpmsService
 */

import { isObj } from 'ramda-adjunct';

import config from '../../config';
import type { HttpResponse, RequestError } from '../../net';
import type {
    BaseRequestControl,
    InitialResult,
    RequestData,
    RequestSettingsValue,
    RequestResult
} from '../BaseService';
import { BaseService } from '../BaseService';
import { errorCodeMap, ErrorData } from '../ErrorData';

import type { NpmsErrorResponse } from './type';

/**
 * Request timeout in `ms` for `npms` service.
 * @type {number}
 */
const NPMS_SERVICE_TIMEOUT = 500;

/**
 * Base npms service api.
 * @class NpmsService
 * @extends module:service/BaseService
 */
class NpmsService extends BaseService {
    /**
     * Gets request result in case of error.
     * @param {module:net/http~RequestError} error - error object.
     * @param {module:net/http~BaseRequestControl} request - object represents request.
     * @param {module:service/Base~RequestResult} defaultResult - object represents default result.
     * @return {module:service/Base~RequestResult | null} - returns request result `null` by default.
     */   // @ts-ignore: 'error'/'request'/'defaultResult' is declared but its value is never read.ts(6133)
    getRequestResultFromError(error: RequestError, request: BaseRequestControl, defaultResult: RequestResult): Partial<RequestResult> | null { // eslint-disable-line class-methods-use-this, require-jsdoc
        let result: Partial<RequestResult> | null = null;
        const { response } = defaultResult;
        const data = response && (response as HttpResponse).body;

        if (isObj(data as NpmsErrorResponse) && data.code === 'NOT_FOUND') {
            result = {
                error: new ErrorData(errorCodeMap.ENDPOINT_NOT_FOUND, data.message),
                result: null
            };
        }

        return result;
    }
}

NpmsService.prototype._contentType = '';
NpmsService.prototype._requestUrl = config.net.npmApiUrl;

// eslint-disable-next-line require-jsdoc
export function sendRequest<InitRes = InitialResult, Res = InitRes>(
    urlEnd: string,
    paramSet?: RequestData,
    settings?: RequestSettingsValue
): BaseRequestControl<InitRes, Res> {

    if (! urlEnd) {
        throw new Error('API URL end is not set');
    }

    return new NpmsService()
        .setRequestTimeout(NPMS_SERVICE_TIMEOUT)
        .setRequestUrlEnd(urlEnd)
        .sendRequest(paramSet, settings);
}
