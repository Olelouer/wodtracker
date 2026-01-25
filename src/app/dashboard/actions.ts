"use server"

import { db } from '@/db';

export async function getWods()  {
    try {
        return await db.query.workouts.findMany({
            with: {
                workoutExercises: {
                    with: {
                        exercise: true
                    }
                }
            }
        });
    } catch(e) {
        console.log(e);
        return [];
    }
}