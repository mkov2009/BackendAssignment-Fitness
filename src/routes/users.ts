import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { models } from '../db'
import {User, UserLogin} from "../types/user-types";
import {UserModel} from "../db/user";

const router = Router()

const {
    User
} = models

export default () => {
    router.post('/register', async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        const { password, ...user }: User = req.body;

        const hashedPassword: string = await bcrypt.hash(password, 10);

        const { dataValues: { passwordHash, ...newUser } }: UserModel  = await User.create({ ...user, passwordHash: hashedPassword });

        return res.json({
            data: newUser,
            message: 'User registered successfully'
        });
    })

    router.post('/login', async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        const login: UserLogin = req.body;

        const user: UserModel = await User.findOne({ where: { email: login.email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid: boolean = await bcrypt.compare(login.password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // TODO add authentication config with secret key and options
        const accessToken: string = jwt.sign({ userId: user.id, role: user.role }, "your_jwt_secret", { expiresIn: '1h' });
        return res.json({
            data: {accessToken},
            message: 'User logged in successfully',
        });
    });

    return router
}
