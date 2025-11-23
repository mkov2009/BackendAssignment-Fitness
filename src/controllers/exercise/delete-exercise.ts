import {NextFunction, Request, Response} from "express";
import {models} from "../../db";
import {DoesNotExistError} from "../../errors/exercise-errors";
const { Exercise } = models

class DeleteExercise {
    async delete(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const { id } = req.body;
        const exercise = await Exercise.findByPk(id);
        if (!exercise) {
            throw new DoesNotExistError({ id });
        }
        await Exercise.destroy({ where: { id } });
        return res.json({
            data: {},
            message: `Exercise with id ${id} deleted successfully`
        });
    }
}

export default new DeleteExercise();