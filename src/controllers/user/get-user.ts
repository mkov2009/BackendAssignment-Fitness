import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
import {DoesNotExistError} from "../../errors/user-errors";
import {USER_ROLE} from "../../utils/enums";
const {User, ExerciseLog, Exercise} = models;


class GetUser {
    async get(req: Request, res: Response, _next: NextFunction): Promise<any> {
        if (req.user.role === USER_ROLE.USER) {
            return await getUser(req.user.id, res);
        }

        return await getUser(req.body.id, res);
    }

}
async function getUser(id: string, res: Response) {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['passwordHash'] },
        include: {
            model: ExerciseLog,
            attributes: ["duration", "datetime"],
            include: [
                {
                    model: Exercise,
                    attributes: ["name"]
                }
            ]
        }
    });
    if (!user) {
        throw new DoesNotExistError({id});
    }

    return res.json({
        data: user,
        message: 'User retrieved successfully'
    });
}

export default new GetUser();