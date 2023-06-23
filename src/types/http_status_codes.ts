
"use strict";

/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 * @see {@link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
 */
enum HttpStatusCode {
    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
    OK = 200,

    /**
     * The request has been fulfilled, resulting in the creation of a new resource.
     */
    CREATED = 201,

    /**
     * The request has been accepted for processing, but the processing has not been completed.
     * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
     */
    ACCEPTED = 202,

    /**
     * SINCE HTTP/1.1
     * The server is a transforming proxy that received a 200 OK from its origin,
     * but is returning a modified version of the origin's response.
     */
    NON_AUTHORITATIVE_INFORMATION = 203,

    /**
     * The server successfully processed the request and is not returning any content.
     */
    NO_CONTENT = 204,

    /**
     * The server cannot or will not process the request due to an apparent client error
     * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
     */
    BAD_REQUEST = 400,

    /**
     * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
     * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
     * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
     * "unauthenticated",i.e. the user does not have the necessary credentials.
     */
    UNAUTHORIZED = 401,

    /**
     * The request was valid, but the server is refusing action.
     * The user might not have the necessary permissions for a resource.
     */
    FORBIDDEN = 403,

    /**
     * The requested resource could not be found but may be available in the future.
     * Subsequent requests by the client are permissible.
     */
    NOT_FOUND = 404,
}

export default HttpStatusCode;