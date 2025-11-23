import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
const { User } = models
import { DoesNotExistError } from "../../errors/user-errors";
import {UpdateUserSchema} from "../../validations/user-validations";

class UpdateUser {
    async update(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const input = UpdateUserSchema.parse(req.body);
        const user = await User.findByPk(input.id);
        if (!user) {
            throw new DoesNotExistError({ id: input.id });
        }

        const updatedUser = await User.update({ ...user, ...input }, {
            where: { id: input.id },
            returning: true,
        })
        return res.json({
            data: updatedUser,
            message: 'Exercise updated successfully.'
        })
    }
}

export default new UpdateUser();