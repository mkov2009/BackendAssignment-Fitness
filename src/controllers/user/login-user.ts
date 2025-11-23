import {NextFunction, Request, Response} from "express";
import bcrypt from "bcryptjs";
import {UserModel} from "../../db/user";
import {UserLogin} from "../../types/user-types";
import {models} from "../../db";
import jwt from "jsonwebtoken";
const {User} = models;

class LoginUser {
    async login(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const login: UserLogin = req.body;

        const user: UserModel = await User.findOne({ where: { email: login.username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid: boolean = await bcrypt.compare(login.password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // TODO add authentication config with secret key and options
        const access_token: string = jwt.sign({ userId: user.id, role: user.role }, "your_jwt_secret", { expiresIn: '1h' });
        return res.json({
            access_token,
            message: 'User logged in successfully',
        });
    }
}

export default new LoginUser();