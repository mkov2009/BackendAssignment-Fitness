import { NextFunction, Request, Response } from "express";
import { models } from "../../db";
import { DeleteExerciseLogSchema } from "../../validations/exercise-log-validations";
const { ExerciseLog } = models

class DeleteExerciseLog {
    async delete(req: Request, res: Response, _next: NextFunction): Promise<any> {
        const { exerciseId, datetime } = DeleteExerciseLogSchema.parse(req.body);
        const userId = req.user.id;
        const deletedCount = await ExerciseLog.destroy({
            where: {
                exerciseId,
                userId,
                datetime
            }
        });

        res.json({
            data: { deletedCount },
            message: deletedCount > 0 ? 'Exercise log deleted successfully' : 'No matching exercise log found',
        })
    }
}

export default new DeleteExerciseLog();