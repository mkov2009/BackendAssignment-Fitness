import { z } from 'zod';
import { EXERCISE_DIFFICULTY } from "../utils/enums";

export const CreateExerciseSchema = z.object({
    name: z.string(),
    difficulty: z.enum(EXERCISE_DIFFICULTY),
    programID: z.number(),
});

export const UpdateExerciseSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    difficulty: z.enum(EXERCISE_DIFFICULTY).optional(),
    programID: z.number().optional(),
});

export const DeleteExerciseSchema = z.object({
    id: z.number(),
});