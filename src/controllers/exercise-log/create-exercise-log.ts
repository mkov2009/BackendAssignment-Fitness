import { NextFunction, Request, Response } from "express";
import { models } from "../../db";
import { DoesNotExistError } from "../../errors/exercise-errors";
import {CreateExerciseLogSchema} from "../../validations/exercise-log-validations";
const { Exercise, ExerciseLog } = models

class CreateExerciseLog {
    async create(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const { exerciseId, duration, datetime } = CreateExerciseLogSchema.parse(req.body);
        const exercise = await Exercise.findByPk(exerciseId);

        if (!exercise) {
            throw new DoesNotExistError({ exerciseId });
        }

        const userId = req.user.id;
        const exerciseLog = await ExerciseLog.create({
            userId,
            exerciseId,
            duration,
            datetime: new Date(datetime),
        });

        return res.json({
            data: exerciseLog,
            message: 'Exercise logged successfully'
        });
    }
}

export default new CreateExerciseLog();