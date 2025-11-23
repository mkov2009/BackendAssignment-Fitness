import {
    Request,
    Response,
    NextFunction
} from 'express'
import jwt from "jsonwebtoken";
import {DecodedToken} from "../types/auth-types";
import {UseCaseRoleMap} from "../config/role-config";
import {NoTokenError, UnauthorizedError} from "../errors/auth-errors";

class AuthorizationMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        const useCase = req.url;
        const roleList = UseCaseRoleMap[useCase];
        if (roleList) {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                throw new NoTokenError();
            }

            const { userId, role } = jwt.verify(token, "your_jwt_secret") as DecodedToken;

            if (!roleList.includes(role)) {
                throw new UnauthorizedError({ userId });
            }
            // Attach decoded token to request object for further use
            (req as any).user = { id: userId, role };
        }

        next();
    }
}

export default AuthorizationMiddleware;