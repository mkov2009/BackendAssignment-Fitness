import {
    Request,
    Response,
    NextFunction
} from 'express'
import jwt from "jsonwebtoken";
import {DecodedToken} from "../types/auth-types";
import {UseCaseRoleMap} from "../config/role-config";

class AuthorizationMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        const useCase = req.url;
        const roleList = UseCaseRoleMap[useCase];
        if (roleList) {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Unauthorized: No token provided' });
                return;
            }

            const decodedToken = jwt.verify(token, "your_jwt_secret") as DecodedToken;

            if (!roleList.includes(decodedToken.role)) {
                res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
                return;
            }
        }

        next();
    }
}

export default AuthorizationMiddleware;