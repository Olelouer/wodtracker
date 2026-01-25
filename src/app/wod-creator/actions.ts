"use server"

import { db } from '@/db';
import { workoutExercises, workouts, WorkoutExerciseDraft } from "@/db/schema";

export async function saveWodAction(data: WorkoutExerciseDraft[]) {
    try {
        const [newWod] = await db.insert(workouts).values({title: "Custom", date: new Date().toISOString()}).returning({ id: workouts.id});
        const exercisesToInsert = data.map((exercise) => ({
           ...exercise,
           workoutId: newWod.id
        }));
        await db.insert(workoutExercises).values(exercisesToInsert);
        return { success: true, message: 'You successfully added the workout!' };
    } catch(e) {
        return { success: false, error: e };
    }
}