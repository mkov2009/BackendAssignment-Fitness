import {UseCaseRole} from "../types/auth-types";

/**
 * Map defining which roles have access to specific use cases (API endpoints).
 * Key: API endpoint (use case)
 * Value: Array of roles that have access to the endpoint
 * If a use case is not listed, it is considered public and accessible to all roles.
 */
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
    // exercise log
    "/exerciseLog/create": ["ADMIN", "USER"],
    "/exerciseLog/delete": ["ADMIN", "USER"],
    "/exerciseLog": ["ADMIN", "USER"],
};