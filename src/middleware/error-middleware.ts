import {GenericError} from "../errors/generic-error";
import {z} from "zod";

class ErrorMiddleware {
    handleError(err: Error, req: any, res: any, next: any) {
        console.error(err);
        if (err instanceof GenericError) {
            res.status(err.getStatus()).send({ message: err.message, data: err.getData() });
        } else if(err instanceof z.ZodError) {
            res.status(400).send({ message: 'Validation error.', issues: err.issues });
        } else {
            res.status(500).send({ message: 'Internal server error.', data: {} });
        }
    }
}

export default new ErrorMiddleware();