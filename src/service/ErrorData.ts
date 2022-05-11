/**
 * Module contains error codes map.
 * @module service/ErrorData
 */

/**
 * Contains error codes map.
 * @readonly
 * @enum {number}
 */
export const errorCodeMap: Record<string, number> = {
    CONNECTION_ERROR: 1001,
    ENDPOINT_NOT_FOUND: 1006,
    INVALID_HTTP_STATUS: 1002,
    INVALID_RESULT: 1003,
    NO_NETWORK: 1004,
    REQUEST_TIMEOUT: 1005,
};

/**
 * Class object which represents error data.
 */
export class ErrorData {
    /** Error code */
    code: number;
    /** Error description */
    message: string | null;
    /** Original error */
    originalError: Error | null;

    /**
     * Creates ErrorData class object.
     * @param {number} code - Error code.
     * @param {string} [message=''] - Error description.
     * @param {Error} [error=null] - Original error.
     */
    constructor(code: number, message?: string | null, error?: Error | null) {
        this.code = code;
        this.message = message || error?.message || '';
        this.originalError = error || null;
    }

    /**
     * Creates `string` representation of error object.
     * @return {string} - `string` representation of error object.
     */
    toString(): string {
        let result = `Error: code - ${this.code}`;

        if (this.message) {
            result += `; message - ${this.message}`;
        }

        if (this.originalError) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            result += `; original error - ${this.originalError}`;
        }

        return result;
    }
}


