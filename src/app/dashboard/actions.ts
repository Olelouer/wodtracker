"use server"

import { db } from '@/db';
import { users, workouts } from '@/db/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';

export async function getWods()  {
    try {
        return await db.query.workouts.findMany({
            with: {
                workoutExercises: {
                    with: {
                        exercise: true
                    },
                }
            },
            orderBy: [desc(workouts.date)]
        });
    } catch(e) {
        console.error(e);
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