import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
const { Exercise } = models

class CreateExercise {
    async create(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const exercise = await Exercise.create(req.body)
        return res.json({
            data: exercise,
            message: 'Exercise created successfully'
        })
    }
}

export default new CreateExercise();