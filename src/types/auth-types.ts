import {USER_ROLE} from "../utils/enums";

export type Role = keyof typeof USER_ROLE;

export interface DecodedToken {
    userId: string,
    role: USER_ROLE
}

export type UseCaseRole = {
    [key: string]: Role[]
}