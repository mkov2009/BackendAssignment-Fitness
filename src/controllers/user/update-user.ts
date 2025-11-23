import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
const { User } = models
import { DoesNotExistError } from "../../errors/user-errors";

class UpdateUser {
    async update(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new DoesNotExistError({ id: req.params.id });
        }

        const updatedUser = await User.update({ ...user, ...req.body }, {
            where: { id: req.params.id },
            returning: true,
        })
        return res.json({
            data: updatedUser,
            message: 'Exercise updated successfully.'
        })
    }
}

export default new UpdateUser();