"use server"

import { db } from '@/db';
import { workoutExercises, workouts, WorkoutExerciseDraft } from "@/db/schema";
import { currentUser } from '@clerk/nextjs/server';

export async function saveWodAction(data: WorkoutExerciseDraft[]) {
    const user = await currentUser();

    if(!user) return { success: false, error: "Utilisateur non connecté" };
    try {
        const [newWod] = await db.insert(workouts).values({
            title: "Custom",
            userId: user.id,
            type: "AMRAP",
            date: new Date().toISOString()
        }).returning({ id: workouts.id});
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