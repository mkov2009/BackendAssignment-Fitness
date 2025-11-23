import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
const { Exercise } = models
import { DoesNotExistError } from "../../errors/exercise-errors";
import {UpdateExerciseSchema} from "../../validations/exercise-validations";

class UpdateExercise {
    async update(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const input = UpdateExerciseSchema.parse(req.body);
        const id = input.id;
        const exercise = await Exercise.findByPk(id);
        if (!exercise) {
            throw new DoesNotExistError({ id });
        }

        const updatedExercise = await Exercise.update({ ...exercise.dataValues, ...input }, {
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