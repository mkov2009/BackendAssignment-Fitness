import {GenericError} from "./generic-error";

export class DoesNotExistError extends GenericError {
    constructor(data: {}) {
        super("Exercise does not exist.", 404, data);
    }
}