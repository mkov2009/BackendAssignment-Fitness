import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
const {
    Exercise,
    Program
} = models

class ListExercise {
    async list(_req: Request, res: Response, _next: NextFunction): Promise<any> {
        // TODO add pagination
        const exercises = await Exercise.findAll({
            include: [{
                model: Program
            }]
        })

        return res.json({
            data: exercises,
            message: 'List of exercises'
        })
    }
}

export default new ListExercise();