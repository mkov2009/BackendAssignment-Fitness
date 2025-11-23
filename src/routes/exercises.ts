import { Router } from 'express'
import CreateExercise from "../controllers/exercise/create-exercise";
import DeleteExercise from "../controllers/exercise/delete-exercise";
import ListExercise from "../controllers/exercise/list-exercise";
import UpdateExercise from "../controllers/exercise/update-exercise";

const router = Router()

export default () => {
	router.get('/', ListExercise.list);
	router.post('/create', CreateExercise.create);
	router.post("/update", UpdateExercise.update);
	router.post('/delete', DeleteExercise.delete);

	return router
}
