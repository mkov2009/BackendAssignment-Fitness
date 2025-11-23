import { Router } from 'express'
import CreateExerciseLog from "../controllers/exercise-log/create-exercise-log";
import DeleteExerciseLog from "../controllers/exercise-log/delete-exercise-log";

const router = Router()

export default () => {
    router.post('/create', CreateExerciseLog.create);
    router.post('/logExercise/delete', DeleteExerciseLog.delete);

    return router
}
