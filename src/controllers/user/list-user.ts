import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
import {USER_ROLE} from "../../utils/enums";

const {User} = models;

class ListUser {
    async list(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const isUser: boolean = req.user.role === USER_ROLE.USER;
        let findOptions;
        if (isUser) {
            findOptions = { attributes: ["id", "nickName"] };
        } else {
            findOptions = {
                attributes: { exclude: ["passwordHash"] }
            };
        }

        const users = await User.findAll(findOptions);
        return res.json({
            data: users,
            message: 'List of users'
        });
    }
}

export default new ListUser();