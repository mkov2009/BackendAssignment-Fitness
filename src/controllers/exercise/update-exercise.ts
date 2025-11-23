import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
const { Exercise } = models
import { DoesNotExistError } from "../../errors/exercise-errors";

class UpdateExercise {
    async update(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const id = req.body.id;
        const exercise = await Exercise.findByPk(id);
        if (!exercise) {
            throw new DoesNotExistError({ id });
        }

        const updatedExercise = await Exercise.update({ ...exercise.dataValues, ...req.body }, {
            where: { id },
            returning: true,
        })
        return res.json({
            data: updatedExercise,
            message: 'Exercise updated successfully.'
        })
    }
}

export default new UpdateExercise();