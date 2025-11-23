import { z } from 'zod';
import {USER_ROLE} from "../utils/enums";

export const RegisterUserSchema = z.object({
    name: z.string(),
    surname: z.string(),
    nickName: z.string(),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(USER_ROLE),
});

export const LoginUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const GetUsersSchema = z.object({
    id: z.number().optional(),
});

export const UpdateUserSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    surname: z.string().optional(),
    nickName: z.string().optional(),
    role: z.enum(USER_ROLE).optional(),
})