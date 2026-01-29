"use server"

import { db } from '@/db';
import { users } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

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

export async function syncUser() {
    const activeUser = await currentUser();
    if(!activeUser) return {};

    const existingUser = await db.query.users.findFirst({
        where: eq(users.id, activeUser.id)
    });

    if (!existingUser) await db.insert(users).values({
        id: activeUser.id,
        username: activeUser.username || `${activeUser.firstName} ${activeUser.lastName}`
    });

    return activeUser.id;
}