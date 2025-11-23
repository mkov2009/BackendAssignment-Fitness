import {GenericError} from "./generic-error";

export class UnauthorizedError extends GenericError {
    constructor(data: {}) {
        super("Forbidden: You do not have access to this resource", 403, data);
    }
}

export class NoTokenError extends GenericError {
    constructor() {
        super("Unauthorized: No token provided", 401, {});
    }
}

export default {
    UnauthorizedError,
    NoTokenError,
}