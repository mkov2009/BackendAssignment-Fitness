import {GenericError} from "./generic-error";

export class DoesNotExistError extends GenericError {
    constructor(data: {}) {
        super("User does not exist.", 404, data);
    }
}

export class InvalidCredentialsError extends GenericError {
    constructor() {
        super("Invalid email or password.", 401, {});
    }
}