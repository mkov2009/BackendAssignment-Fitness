import {USER_ROLE} from "../utils/enums";

//https://stackoverflow.com/a/40762463/13686468
declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: string;
                role: USER_ROLE;
            };
        }
    }
}