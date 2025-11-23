import {USER_ROLE} from "../utils/enums";

export interface User {
    name: string;
    surname: string;
    nickName: string;
    email: string;
    password: string;
    role: USER_ROLE;
}

export interface UserLogin {
    email: string;
    password: string;
}