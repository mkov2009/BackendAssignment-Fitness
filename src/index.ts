import http from 'http'
import express from 'express'

import { sequelize } from './db'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import UsersRouter from './routes/users'
import ExerciseLogRouter from './routes/exercise-log'
import AuthorizationMiddleware from "./middleware/authorization-middleware";
import ErrorMiddleware from "./middleware/error-middleware";

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(AuthorizationMiddleware.authenticate)
app.use('/programs', ProgramRouter())
app.use('/exercise', ExerciseRouter())
app.use("/user", UsersRouter())
app.use("/exerciseLog", ExerciseLogRouter())
app.use(ErrorMiddleware.handleError)

const httpServer = http.createServer(app)

try {
    sequelize.sync()
} catch (error) {
    console.log('Sequelize sync error')
}

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
