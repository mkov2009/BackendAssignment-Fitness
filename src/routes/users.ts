import { Router } from 'express'
import GetUser from "../controllers/user/get-user";
import ListUser from "../controllers/user/list-user";
import LoginUser from "../controllers/user/login-user";
import RegisterUser from "../controllers/user/register-user";
import UpdateUser from "../controllers/user/update-user";

const router = Router()

export default () => {
    router.post('/register', RegisterUser.register);
    router.post('/login', LoginUser.login);
    router.get('/', ListUser.list);
    router.get('/get', GetUser.get);
    router.post('/update', UpdateUser.update);

    return router
}
