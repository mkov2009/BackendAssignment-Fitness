import {NextFunction, Request, Response} from "express";
import bcrypt from "bcryptjs";
import {UserModel} from "../../db/user";
import {models} from "../../db";
import {User} from "../../types/user-types";
import {RegisterUserSchema} from "../../validations/user-validations";
const {User} = models


class RegisterUser {
    async register(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const { password, ...user }: User = RegisterUserSchema.parse(req.body);

        const hashedPassword: string = await bcrypt.hash(password, 10);

        const { dataValues: { passwordHash, ...newUser } }: UserModel  = await User.create({ ...user, passwordHash: hashedPassword });

        return res.json({
            data: newUser,
            message: 'User registered successfully'
        });
    }
}

export default new RegisterUser();