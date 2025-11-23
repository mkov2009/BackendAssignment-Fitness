import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
import {CreateExerciseSchema} from "../../validations/exercise-validations";
const { Exercise } = models

class CreateExercise {
    async create(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const input = CreateExerciseSchema.parse(req.body);
        const exercise = await Exercise.create(input)
        return res.json({
            data: exercise,
            message: 'Exercise created successfully'
        })
    }
}

export default new CreateExercise();