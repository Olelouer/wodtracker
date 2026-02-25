"use server"

import { db } from '@/db';
import { workoutExercises, workouts, WorkoutExerciseDraft } from "@/db/schema";
import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

const WORKOUT_TYPES = [
    'AMRAP', 'EMOM', 'FOR_TIME', 'TABATA', 'STRENGTH', 'HERO', 'BENCHMARK', 'SKILL', 'ACCESSORY'
] as const;
type WorkoutType = (typeof WORKOUT_TYPES)[number];

function parseWorkoutType(value: string | null): WorkoutType {
    if (value && WORKOUT_TYPES.includes(value as WorkoutType)) return value as WorkoutType;
    return 'AMRAP';
}

export async function saveWodAction(formData: FormData, exercises: WorkoutExerciseDraft[]) {
    const user = await currentUser();

    if (!user) return { success: false, error: "Utilisateur non connecté" };
    try {
        const title = (formData.get('title') as string)?.trim() || 'Custom';
        const type = parseWorkoutType(formData.get('type') as string);
        const durationRaw = formData.get('duration');
        const duration = durationRaw !== null && durationRaw !== '' ? Number(durationRaw) : null;
        const isRx = formData.get('isRx') === 'on';
        const dateStr = formData.get('date') as string | null;
        const date = dateStr ? new Date(dateStr) : new Date();

        const [newWod] = await db.insert(workouts).values({
            userId: user.id,
            title,
            type,
            duration,
            isRx,
            date,
        }).returning({ id: workouts.id });

        const exercisesToInsert = exercises.map((exercise) => ({
            ...exercise,
            workoutId: newWod.id,
        }));
        await db.insert(workoutExercises).values(exercisesToInsert);
        return { success: true, message: 'You successfully added the workout!' };
    } catch (e) {
        return { success: false, error: e };
    }
}

export async function updateWodAction(workoutId: number, formData: FormData, exercises: WorkoutExerciseDraft[]) {
    const user = await currentUser();
    if (!user) return { success: false, error: "Utilisateur non connecté" };

    try {
        const title = (formData.get('title') as string)?.trim() || 'Custom';
        const type = parseWorkoutType(formData.get('type') as string);
        const durationRaw = formData.get('duration');
        const duration = durationRaw !== null && durationRaw !== '' ? Number(durationRaw) : null;
        const isRx = formData.get('isRx') === 'on';
        const dateStr = formData.get('date') as string | null;
        const date = dateStr ? new Date(dateStr) : new Date();

        await db
            .update(workouts)
            .set({ title, type, duration, isRx, date })
            .where(and(eq(workouts.id, workoutId), eq(workouts.userId, user.id)));

        await db.delete(workoutExercises).where(eq(workoutExercises.workoutId, workoutId));

        const exercisesToInsert = exercises.map((exercise) => ({
            ...exercise,
            workoutId,
        }));
        await db.insert(workoutExercises).values(exercisesToInsert);

        return { success: true, message: 'Workout updated successfully!' };
    } catch (e) {
        return { success: false, error: e };
    }
}