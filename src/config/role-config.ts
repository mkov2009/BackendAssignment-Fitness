import {UseCaseRole} from "../types/auth-types";

export const UseCaseRoleMap: UseCaseRole = {
    // user
    "/user/get": ["ADMIN", "USER"],
    "/user": ["ADMIN", "USER"],
    "/user/update": ["ADMIN"],
    // exercise
    "/exercise/create": ["ADMIN"],
    "/exercise/update": ["ADMIN"],
    "/exercise/delete": ["ADMIN"],
    "/exercise": ["ADMIN", "USER"],
};