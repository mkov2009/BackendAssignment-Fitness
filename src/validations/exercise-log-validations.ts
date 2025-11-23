import { z } from 'zod';

export const CreateExerciseLogSchema = z.object({
    exerciseId: z.number(),
    duration: z.number(),
    datetime: z.coerce.date(),
});

export const DeleteExerciseLogSchema = z.object({
    exerciseId: z.number(),
    datetime: z.date(),
});